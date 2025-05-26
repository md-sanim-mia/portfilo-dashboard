import BlogsPage from "@/components/Blogs";
import { getAllblog } from "@/services/blogs";

const Blogs = async () => {
  const { data } = await getAllblog();
  return (
    <div>
      <BlogsPage data={data} />
    </div>
  );
};

export default Blogs;
