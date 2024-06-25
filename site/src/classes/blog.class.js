class Blogs {
    constructor(title, description, src, creatorId) {
        this.title = title;
        this.description = description;
        this.src = src;
        this.creatorId = creatorId;
        this.likes = [];
        this.comments = [];
    }
}
export default Blogs;
