const mongoose = require("mongoose");
const commentController = require("../controllers/commentController");
const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

jest.mock("../models/commentModel");
jest.mock("../models/blogModel");

describe("Comment Controller", () => {
  let req, res;
  const userId = new mongoose.Types.ObjectId();
  const postId = new mongoose.Types.ObjectId();
  const commentId = new mongoose.Types.ObjectId();

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      user: { _id: userId },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("addComment", () => {
    beforeEach(() => {
      req.params = { id: postId };
      req.body = { text: "Test comment" };
    });

    it("should return 404 if blog post is not found", async () => {
      Blog.findById = jest.fn().mockResolvedValue(null);

      await commentController.addComment(req, res);

      expect(Blog.findById).toHaveBeenCalledWith(postId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Could not find the post",
      });
    });

    it("should return 400 if comment text is missing", async () => {
      Blog.findById = jest.fn().mockResolvedValue({ _id: postId });
      req.body = {};

      await commentController.addComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment text is required",
      });
    });

    it("should return 400 if user ID is missing", async () => {
      Blog.findById = jest.fn().mockResolvedValue({ _id: postId });
      req.user = {};

      await commentController.addComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User ID is required" });
    });

    it("should return 500 if there is a server error", async () => {
      Blog.findById = jest.fn().mockRejectedValue(new Error("Database error"));
      console.error = jest.fn();

      await commentController.addComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to add comment",
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("deleteComment", () => {
    beforeEach(() => {
      req.params = { id: commentId };
    });

    it("should delete a comment successfully", async () => {
      const mockComment = {
        _id: commentId,
        postedBy: userId,
        toString: jest.fn().mockReturnValue(userId.toString()),
      };

      Comment.findById = jest.fn().mockResolvedValue(mockComment);
      Comment.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await commentController.deleteComment(req, res);

      expect(Comment.findById).toHaveBeenCalledWith(commentId);
      expect(Comment.findByIdAndDelete).toHaveBeenCalledWith(commentId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment deleted successfully",
      });
    });

    it("should return 404 if comment is not found", async () => {
      Comment.findById = jest.fn().mockResolvedValue(null);

      await commentController.deleteComment(req, res);

      expect(Comment.findById).toHaveBeenCalledWith(commentId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Comment not found" });
    });

    it("should return 403 if user is not authorized to delete the comment", async () => {
      const differentUserId = new mongoose.Types.ObjectId();

      const mockComment = {
        _id: commentId,
        postedBy: differentUserId,
      };

      mockComment.postedBy.toString = jest
        .fn()
        .mockReturnValue(differentUserId.toString());
      req.user._id.toString = jest.fn().mockReturnValue(userId.toString());

      Comment.findById = jest.fn().mockResolvedValue(mockComment);

      await commentController.deleteComment(req, res);

      expect(Comment.findById).toHaveBeenCalledWith(commentId);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "You are not authorized to delete this comment",
      });
    });

    it("should return 500 if there is a server error", async () => {
      Comment.findById = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));
      console.error = jest.fn();

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to delete comment",
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("getcomments", () => {
    beforeEach(() => {
      req.params = { id: postId };
    });

    it("should get all comments for a post", async () => {
      const mockComments = [
        {
          _id: commentId,
          text: "Test comment",
          postedBy: {
            _id: userId,
            firstname: "John",
            lastname: "Doe",
            image: "profile.jpg",
          },
          postId: postId,
        },
      ];

      Comment.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockComments),
      });

      await commentController.getcomments(req, res);

      expect(Comment.find).toHaveBeenCalledWith({ postId: postId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        comments: mockComments,
      });
    });

    it("should return 500 if there is a server error", async () => {
      Comment.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error("Database error")),
      });
      console.error = jest.fn();

      await commentController.getcomments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
      expect(console.error).toHaveBeenCalled();
    });
  });
});
