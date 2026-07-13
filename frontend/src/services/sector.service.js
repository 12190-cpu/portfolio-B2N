import api from "../api/api";

const sectorService = {
  getAll() {
    return api.get("/sectors");
  },

  getById(id) {
    return api.get(`/sectors/${id}`);
  },

  create(sectorData) {
    return api.post("/sectors", sectorData);
  },

  update(id, sectorData) {
    return api.put(`/sectors/${id}`, sectorData);
  },

  remove(id) {
    return api.delete(`/sectors/${id}`);
  }
};

export default sectorService;