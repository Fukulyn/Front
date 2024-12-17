const ip = import.meta.env.VITE_IP;

export const api = {
    findAll: `http://127.0.0.1:27107/api/v1/user/findAll`,
    findByName: `http://127.0.0.1:27107/api/v1/user/findByName`,
    insertOne: `http://127.0.0.1:27107/api/v1/user/insertOne`,
    deletedByName: `http://127.0.0.1:27107/api/v1/user/deletedByName`,
    updateByName: `http://127.0.0.1:27107/api/v1/user/updateByName`,
};

