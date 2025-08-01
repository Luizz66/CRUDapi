using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace List.Migrations
{
    /// <inheritdoc />
    public partial class AddTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Title",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Title", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Title",
                columns: new[] { "Id", "Title" },
                values: new object[] { 1, "Minha Lista" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Title");
        }
    }
}
