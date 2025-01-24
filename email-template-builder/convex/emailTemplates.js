import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

export const SaveTemplate = mutationGeneric({
  args: {
    tid: v.string(),
    design: v.any(),
    email: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("emailTemplates", {
        tid: args.tid,
        design: args.design,
        email: args.email,
        description: args.description,
      });
      return result;
    } catch (error) {
      console.error("Error saving template:", error);
      throw new Error("Failed to save template");
    }
  },
});

export const GetTemplateDesign = queryGeneric({
  args: {
    tid: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("emailTemplates")
        .filter((q) =>
          q.and(
            q.eq(q.field("tid"), args.tid),
            q.eq(q.field("email"), args.email)
          )
        )
        .collect();

      console.log("GetTemplateDesign", result);

      if (result.length === 0) {
        throw new Error("Template not found");
      }

      return result[0];
    } catch (error) {
      console.error("Error fetching template design:", error);
      // throw new Error("Failed to get template design");
      return null;
    }
  },
});

export const UpdateTemplateDesign = mutationGeneric({
  args: {
    tid: v.string(),
    design: v.any(),
  },
  handler: async (ctx, args) => {
    if (!args.design) {
      throw new Error("The `design` field is required but missing.");
    }

    // Get doc id
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    if (!result.length) {
      throw new Error(`No document found with tid: ${args.tid}`);
    }

    const docId = result[0]._id;

    // Update docId
    await ctx.db.patch(docId, {
      design: args.design,
    });
  },
});

export const GetAllUserTemplates = queryGeneric({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});
