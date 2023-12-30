import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "http://10.0.2.2:8088/",
  timeout: 30000
});

const API = {
  requestGET_SP: async (urlService) => {
    return await apiInstance
      .get(urlService)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },

  requestPOST_SP: async (urlService, data) => {
    return await apiInstance
      .post(urlService, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },

  requestPOST_Login: async (urlService, data) => {
    return await apiInstance
      .post(urlService, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'tenant': 'root'
        }
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },
  
  requestDELETE: async (urlService) => {
    return await apiInstance
      .delete(urlService)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },
  requestSignup:async (urlService,data) => {
    return await apiInstance
    .post(urlService, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'tenant': 'root'
      }
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: null };
    });
  },
  requestGET_USER_DETAILS:async (urlService) => {
    return await apiInstance
    .get(urlService)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: null };
    });

  }, 
  requestDELETE_USER: async (urlService) => {
    return await apiInstance
      .delete(urlService)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },
  requestDELETE_ORDER: async (urlService) => {
    return await apiInstance
      .delete(urlService)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },

  requestGET_ORDERS:async (urlService) => {
    return await apiInstance
    .get(urlService)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: null };
    });

  }, 
  
};

export default API;
