using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskMate.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIsArchive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_archived",
                table: "tasks");

            migrationBuilder.AddColumn<bool>(
                name: "is_archived",
                table: "notes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_archived",
                table: "notes");

            migrationBuilder.AddColumn<bool>(
                name: "is_archived",
                table: "tasks",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
