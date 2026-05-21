export class BaseHttpClient {
    async request(req) {
        console.log(`[HTTP Client] Sending request to: ${req.url}`);
        if (req.headers && req.headers.Authorization === 'Bearer EXPIRED') {
            return { status: 401, data: null };
        }
        return { status: 200, data: { success: true } };
    }
}

export class AuthProxy {
    constructor(httpClient, tokenProvider) {
        this.httpClient = httpClient;
        this.tokenProvider = tokenProvider; 
    }
    async request(req) {
        let token = this.tokenProvider.getToken();
        const authReq = {
            ...req,
            headers: { ...req.headers, Authorization: `Bearer ${token}` }
        };
        let response = await this.httpClient.request(authReq);
        if (response.status === 401 && this.tokenProvider.refreshToken) {
            token = await this.tokenProvider.refreshToken();
            authReq.headers.Authorization = `Bearer ${token}`;
            response = await this.httpClient.request(authReq);
        }
        return response;
    }
}

export class GitHubService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getUserData(username) {
        return this.httpClient.request({ url: `https://api.github.com/users/${username}` });
    }
}