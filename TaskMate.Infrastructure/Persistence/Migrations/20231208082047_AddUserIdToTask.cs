using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskMate.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "user_id",
                table: "tasks",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "user_id",
                table: "tasks");
        }
    }
}
