import SkillsPage from "@/components/Skills";
import { getAllskill } from "@/services/skill";

const Skills = async () => {
  const { data } = await getAllskill();
  return (
    <div>
      <SkillsPage skills={data} />
    </div>
  );
};

export default Skills;
