import axios,{ AxiosResponse } from 'axios';

/**
    * Sends a GET request to the API.
 * 
 * @param {string} url - The API endpoint.
 * @param {Object} [params={}] - Query parameters.
 * @param {string} [token=null] - Authorization token (if required).
 * @returns {Promise<Object>} - The response data or an error object.
 */
const getRequest = async (
    url: string,
    params: Record<string, any> = {},
    token: string | null = null
  ): Promise<any> => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response: AxiosResponse = await axios.get(url, {
        params,
        headers,
      });
      
      return response.data;
    } catch (error: any) {
      console.error('GET request error:', error);
      return { error: error.response?.data || 'An error occurred' };
    }
  };
/**
 * Generic function to make GET requests using Axios.
 * 
 * @param {string} url - The API endpoint.
 * @param {Record<string, any>} [params={}] - Query parameters.
 * @param {string | null} [token=null] - Authorization token (if required).
 * @returns {Promise<any>} - The response data or an error object.
 */
const postRequest = async (
  url: string,
  params: Record<string, any> = {},
  token: string | null = null
): Promise<any> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response: AxiosResponse = await axios.get(url, {
      params,
      headers,
    });
    
    return response.data;
  } catch (error: any) {
    console.error('GET request error:', error);
    return { error: error.response?.data || 'An error occurred' };
  }
};
export { getRequest, postRequest };
  