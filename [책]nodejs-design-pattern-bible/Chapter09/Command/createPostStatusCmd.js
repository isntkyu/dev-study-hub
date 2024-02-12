export function createPostStatusCmd (service, status) {
    let postId = null

    return {
        run() { // 작업패턴
            postId = service.postUpdate(status)
        },
        undo() {
            if (postId) {
                service.destroyUpdate(postId)
                postId = null
            }
        },
        serialize() {
            return { type: 'status', action: 'post', status: status }
        }
    }
}