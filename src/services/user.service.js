import api from "./api.service";
class UserService {
  constructor() {
    this.path = "/public";
    this.userPath = "/api/v1/users";
  }

  async login(user) {
    const data = (await api.post(`${this.path}/login`, user)).data;
    return data;
  }

  async logout() {
    return (await api.post(`${this.userPath}/logout`)).data;
  }

  async signup(user) {
    return (await api.post(`${this.path}/signup`, user)).data;
  }

  async verifyUser() {
    try {
      return (await api.get(`${this.userPath}/verify`)).data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async forgetPassword(email) {
    await api.post(`${this.path}/forget-password`, { email });
  }

  async sendmail(user_email) {
    await api.post(`${this.path}/sendEmail/forget-password`, user_email);
  }

  async resetPassword(user_id, newPassword) {
    await api.patch(`${this.path}/reset-password?user_id=${user_id}`, {
      newPassword,
    });
  }

  async getUserId(id) {
    return (await api.get(`${this.userPath}/${id}`)).data;
  }

  async update(id, data) {
    return (await api.patch(`${this.userPath}/${id}`, data)).data;
  }

  async getUserByEmail(email) {
    return (await api.get(`${this.userPath}/emails/${email}`)).data;
  }

  async updateUserImage(user_id, image) {
    const formData = new FormData();
    formData.append("file", image);
    return (
      await api.patch(`${this.userPath}/${user_id}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  }
}

export default new UserService();
