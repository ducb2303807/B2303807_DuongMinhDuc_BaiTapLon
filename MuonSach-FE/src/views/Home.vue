<script>
// Import Service nếu bạn đã nối API (tạm thời mình dùng dữ liệu giả)
// import { bookService } from "@/services/book.service";

export default {
  data() {
    return {
      searchText: "",
      // Dữ liệu giả lập (Sau này sẽ gọi API để lấy list này)
      books: [
        {
          id: 1,
          title: "Lập trình Vue.js từ A-Z",
          author: "Nguyễn Văn A",
          price: 5000,
          quantity: 10,
          image: "https://placehold.co/400x600/png?text=VueJS",
        },
        {
          id: 2,
          title: "Đắc Nhân Tâm",
          author: "Dale Carnegie",
          price: 2000,
          quantity: 0, // Hết sách
          image: "https://placehold.co/400x600/png?text=Book",
        },
        {
          id: 3,
          title: "Nhà Giả Kim",
          author: "Paulo Coelho",
          price: 3000,
          quantity: 5,
          image: "https://placehold.co/400x600/png?text=Alchemy",
        },
        {
          id: 4,
          title: "Clean Code - Mã Sạch",
          author: "Robert C. Martin",
          price: 7000,
          quantity: 3,
          image: "https://placehold.co/400x600/png?text=CleanCode",
        },
        {
          id: 5,
          title: "Harry Potter và Hòn đá phù thủy",
          author: "J.K. Rowling",
          price: 10000,
          quantity: 12,
          image: "https://placehold.co/400x600/png?text=HarryPotter",
        },
      ],
    };
  },
  computed: {
    // Hàm lọc sách tự động khi searchText thay đổi
    filteredBooks() {
      if (!this.searchText) return this.books;

      const text = this.searchText.toLowerCase();
      return this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(text) ||
          book.author.toLowerCase().includes(text)
      );
    },
  },
  methods: {
    goToDetail(bookId) {
      // Chuyển hướng đến trang chi tiết (Cần định nghĩa trong router)
      // this.$router.push(`/books/${bookId}`);
      console.log("Xem chi tiết sách:", bookId);
    },
    handleBorrow(book) {
      // Logic mượn sách (Check login -> Gọi API)
      const isLoggedIn = localStorage.getItem("token");
      if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để mượn sách!");
        this.$router.push("/login");
        return;
      }
      alert(`Đã thêm "${book.title}" vào giỏ mượn!`);
    },
  },
  //   async created() {
  //     Nếu có API thì bỏ comment dòng này để load sách thật
  //     try {
  //         this.books = await bookService.getAll();
  //     } catch (error) {
  //         console.log(error);
  //     }
  //   }
};
</script>

<style scoped>
/* Hiệu ứng hover nhẹ cho thẻ Card */
.hover-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
