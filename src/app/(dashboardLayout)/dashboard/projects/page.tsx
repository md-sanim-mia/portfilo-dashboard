import ProjectsPage from "@/components/project";
import { getAllProject } from "@/services/project";
const AllProject = async () => {
  const { data } = await getAllProject();
  return (
    <div>
      <ProjectsPage projects={data} />
    </div>
  );
};

export default AllProject;
