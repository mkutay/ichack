import { getRecursiveHistoryAlsoId } from "@/lib/db";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export async function BreadcrumbAsync({ id }: { id: string}) {
  const history = await getRecursiveHistoryAlsoId(id);
  const breadcrumb = history.map((scenario) => ({title: scenario.title !== '' ? scenario.title : scenario.description, link: `/${scenario.id}`}));
  const components: React.ReactNode[] = [];
  components.push(
    <BreadcrumbItem key={breadcrumb[0].link}>
      <BreadcrumbLink href={breadcrumb[0].link + '?isNotFirst=true'}>{breadcrumb[0].title}</BreadcrumbLink>
    </BreadcrumbItem>
  );
  for (let i = 1; i < breadcrumb.length; i++) {
    components.push(<BreadcrumbSeparator key={breadcrumb[i].link + 'fml'}/>);
    components.push(<BreadcrumbItem key={breadcrumb[i].link}>
      <BreadcrumbLink href={breadcrumb[i].link + '?isNotFirst=true'}>
        {breadcrumb[i].title}
      </BreadcrumbLink>
    </BreadcrumbItem>)
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {components}
      </BreadcrumbList>
    </Breadcrumb>
  )
}