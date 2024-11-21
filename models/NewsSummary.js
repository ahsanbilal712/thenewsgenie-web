// models/NewsSummary.js
const mongoose = require('mongoose');
const { slugify } = require('../src/utils');

// Define the schema with the necessary fields including a flexible keyfacts object
const newsSummarySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    Headline: String,
    Category: String, // Add Category field
    Summary: String,
    sources: [
      {
        SourceName: String,
        SourceUrl: String,
        keyfacts: String,
      },
    ],
    Image_source_name: String,
    image_url: String,
    similar_facts: [String],
    conflicting_facts: [
      {
        fact: String,
        source: {
          SourceName: String,
          SourceUrl: String,
        },
      },
    ],
    created_at: {
      type: Date,
      default: Date.now, // Automatically set the created_at field to the current date
    },
  },
  {
    collection: "data_news",
    // Disable automatic updatedAt field
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);

newsSummarySchema.pre("save", function (next) {
  if (this.isModified("Headline")) {
    this.slug = slugify(this.Headline, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.models.NewsSummary || mongoose.model('NewsSummary', newsSummarySchema);
