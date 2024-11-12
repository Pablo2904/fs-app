/* eslint-disable camelcase */

exports.shorthands = undefined;

//tabela comments = przechowuje komentarze userów do artykułów
exports.up = (pgm) => {
  // Create the new table
  pgm.createTable("comments", {
    id: "id",
    content: { type: "text", notNull: true },
    user_id: { type: "integer", references: "users", notNull: true },
    article_id: { type: "integer", references: "articles", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  // Create foreign key constraints
  pgm.addConstraint("comments", "fk_user_id", {
    foreignKeys: {
      columns: "user_id",
      references: "users(id)",
    },
  });
  pgm.addConstraint("comments", "fk_article_id", {
    foreignKeys: {
      columns: "article_id",
      references: "articles(id)",
    },
  });
};

exports.down = (pgm) => {
  // Drop the table if reverting the migration
  pgm.dropTable("comments");
};
