export class BaseHttpClient {
    async request(req) {
        console.log(`[HTTP Client] Sending request to: ${req.url}`);
        if (req.headers && req.headers.Authorization === 'Bearer EXPIRED') {
            return { status: 401, data: null };
        }
        return { status: 200, data: { success: true } };
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