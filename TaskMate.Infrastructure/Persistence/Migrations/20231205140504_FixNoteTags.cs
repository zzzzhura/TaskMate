using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskMate.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixNoteTags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_note_tag_notes_notes_temp_id",
                table: "note_tag");

            migrationBuilder.DropForeignKey(
                name: "fk_note_tag_tags_tags_temp_id",
                table: "note_tag");

            migrationBuilder.DropPrimaryKey(
                name: "pk_note_tag",
                table: "note_tag");

            migrationBuilder.RenameTable(
                name: "note_tag",
                newName: "note_tags");

            migrationBuilder.RenameIndex(
                name: "ix_note_tag_tags_id",
                table: "note_tags",
                newName: "ix_note_tags_tags_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_note_tags",
                table: "note_tags",
                columns: new[] { "notes_id", "tags_id" });

            migrationBuilder.AddForeignKey(
                name: "fk_note_tags_notes_notes_id",
                table: "note_tags",
                column: "notes_id",
                principalTable: "notes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_note_tags_tags_tags_temp_id",
                table: "note_tags",
                column: "tags_id",
                principalTable: "tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_note_tags_notes_notes_id",
                table: "note_tags");

            migrationBuilder.DropForeignKey(
                name: "fk_note_tags_tags_tags_temp_id",
                table: "note_tags");

            migrationBuilder.DropPrimaryKey(
                name: "pk_note_tags",
                table: "note_tags");

            migrationBuilder.RenameTable(
                name: "note_tags",
                newName: "note_tag");

            migrationBuilder.RenameIndex(
                name: "ix_note_tags_tags_id",
                table: "note_tag",
                newName: "ix_note_tag_tags_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_note_tag",
                table: "note_tag",
                columns: new[] { "notes_id", "tags_id" });

            migrationBuilder.AddForeignKey(
                name: "fk_note_tag_notes_notes_temp_id",
                table: "note_tag",
                column: "notes_id",
                principalTable: "notes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_note_tag_tags_tags_temp_id",
                table: "note_tag",
                column: "tags_id",
                principalTable: "tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
