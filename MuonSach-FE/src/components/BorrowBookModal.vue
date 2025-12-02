<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div
      class="modal-content border-0 rounded-4 shadow-lg bg-white animate__animated animate__zoomIn"
    >
      <div class="modal-header p-4 border-bottom-0 pb-0">
        <h5 class="modal-title text-primary fw-bold d-flex align-items-center">
          <span
            class="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3"
          >
            <i class="fas fa-book-reader"></i>
          </span>
          Đăng Ký Mượn Sách
        </h5>
        <button
          type="button"
          class="btn-close shadow-none"
          @click="closeModal"
        ></button>
      </div>

      <div class="modal-body p-4 pt-3">
        <Form @submit="submitBorrow" :validation-schema="schema">
          <div
            class="book-card mb-4 p-3 rounded-3 bg-primary-subtle border border-primary border-opacity-10"
          >
            <label
              class="small fw-bold text-uppercase text-primary mb-1 opacity-75"
              >Sách sẽ mượn</label
            >
            <div class="fw-bold text-dark fs-5 text-break">
              <i class="fas fa-book me-2 text-primary"></i>
              {{ book.TenSach }}
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label small fw-bold text-secondary"
                  >Ngày mượn</label
                >
                <div class="input-group">
                  <span
                    class="input-group-text bg-white text-muted border-end-0"
                    ><i class="far fa-calendar-alt"></i
                  ></span>
                  <Field
                    name="NgayMuon"
                    type="date"
                    class="form-control border-start-0 ps-0 fw-bold text-muted bg-white"
                    v-model="borrowData.NgayMuon"
                    readonly
                  />
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label small fw-bold text-secondary"
                  >Số ngày mượn</label
                >
                <div class="input-group">
                  <span
                    class="input-group-text bg-white text-primary border-end-0"
                    ><i class="fas fa-clock"></i
                  ></span>
                  <Field
                    name="borrowDuration"
                    type="number"
                    min="1"
                    class="form-control border-start-0 ps-0 fw-bold text-primary"
                    v-model="borrowDuration"
                    placeholder="VD: 7"
                  />
                  <span
                    class="input-group-text bg-white text-muted border-start-0 small"
                    >ngày</span
                  >
                </div>
                <div
                  class="form-text text-end text-success fw-bold small mt-1"
                  v-if="borrowDuration"
                >
                  <i class="fas fa-calendar-check me-1"></i>Hạn trả:
                  {{ calculatedReturnDate }}
                </div>
                <ErrorMessage
                  name="borrowDuration"
                  class="text-danger small mt-1 d-block"
                />
              </div>
            </div>
          </div>

          <div
            class="user-info d-flex align-items-center p-3 rounded-3 bg-light border border-dashed mb-4"
          >
            <div
              class="avatar-circle bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center me-3"
              style="width: 40px; height: 40px"
            >
              <i class="fas fa-user-circle fa-lg text-secondary"></i>
            </div>
            <div>
              <div class="small text-muted">Tài khoản mượn</div>
              <div class="fw-bold text-dark">@{{ currentUser.Username }}</div>
            </div>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              class="btn btn-light text-muted fw-bold px-4 rounded-pill"
              @click="closeModal"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              class="btn btn-primary fw-bold px-5 rounded-pill shadow-sm"
            >
              <i class="fas fa-paper-plane me-2"></i> Đăng ký
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { getUserData } from "@/utils/auth.utils";

export default {
  components: { Form, Field, ErrorMessage },
  props: {
    book: { type: Object, required: true },
  },
  emits: ["close", "confirm"],
  data() {
    // Sửa validate: Kiểm tra số ngày thay vì ngày tháng
    const schema = yup.object().shape({
      borrowDuration: yup
        .number()
        .typeError("Vui lòng nhập số")
        .required("Vui lòng nhập số ngày mượn")
        .min(1, "Mượn ít nhất 1 ngày")
        .max(30, "Mượn nhiều nhất 30 ngày")
        .integer("Số ngày phải là số nguyên"),
    });

    return {
      schema,
      currentUser: getUserData(),
      borrowDuration: 7,
      borrowData: {
        NgayMuon: new Date().toISOString().substr(0, 10),
      },
    };
  },
  computed: {
    // Tính toán ngày trả để hiển thị cho đẹp
    calculatedReturnDate() {
      if (!this.borrowDuration) return "...";
      const date = new Date(this.borrowData.NgayMuon);
      date.setDate(date.getDate() + parseInt(this.borrowDuration));
      return date.toLocaleDateString("vi-VN");
    },
  },
  methods: {
    getUserData,
    closeModal() {
      this.$emit("close");
    },
    submitBorrow() {
      const muonDate = new Date();

      const payload = {
        MaSach: this.book._id,
        MaDocGia: this.currentUser._id,
        NgayMuon: muonDate,
        SoNgayMuon: this.borrowDuration,
      };
      this.$emit("confirm", payload);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/book-borrow-modal.css";
</style>
