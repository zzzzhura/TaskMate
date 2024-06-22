using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskMate.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeImgFormat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image_url",
                table: "notes");

            migrationBuilder.AddColumn<byte[]>(
                name: "image",
                table: "notes",
                type: "bytea",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "notes");

            migrationBuilder.AddColumn<string>(
                name: "image_url",
                table: "notes",
                type: "text",
                nullable: true);
        }
    }
}
