import { ProjectCardContainerProps } from 'typescript/interfaces/Project'
import ProjectCard from './ProjectCard'


export default function ProjectCardContainer({data}:ProjectCardContainerProps) {
  return (
    <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white dark:bg-slate-950/60 shadow-lg rounded-md
     dark:divide-gray-600 dark:border-gray-600 
    ">
      {data.map((project) => (<ProjectCard project={project} key={project._id}/>))}
    </ul>
  )
}
