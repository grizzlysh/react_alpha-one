import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NextRouter, useRouter } from 'next/router';
import CrumbComponent from '../atoms/Crumbs.component';
import menu from '@/utils/menu';
import { useRoleReadByID } from '@/hooks/role/use-read-by-id';
import api from '@/services';


const getPathSplitted = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];

  return pathWithoutQuery.split("/").filter(v => v.length > 0);
}


interface BreadListProps {
  linkRef       : string,
  textDefault   : string | undefined,
  textGenerator?: () => string,
}

const BreadcrumbsComponent = () => {

  const router                  = useRouter();

  const getTextGenrerator       = React.useCallback((param: string, router: NextRouter) => {

    return {
    //   "post_id": () => await fetchAPI(`/posts/${router.query.post_id}/`).title,
      "post_id": () => {return "oke"},
      "create" : () => {return "Create"},
      // "role_id": () => { const x: any = api.getRoleByID(`${router.query.role_id}`); return x.output_schema?.data?.display_name || '' }
      "role_id": () => {return "Update"}
      // "create": "Create",
    }[param];
  }, []);
  
  const getDefaultTextGenerator = React.useCallback((subpath: string) => {

    const breadMap:{[key:string]: string} = {};

    menu.forEach( (val, idx) => {
      if(idx != 0){
        if(val.child){
          val.child.forEach(
            (child) => {
              breadMap[child.url] = child.title
            }
          )
        }
        else {
          breadMap[val.url] = val.title;
        }
      }
    });
    console.log(breadMap);
    return breadMap[subpath]
  }, [])

  const breadList:BreadListProps[] = React.useMemo( () => {
    
    const asPathSplit   = getPathSplitted(router.asPath)
    const pathNameSplit = getPathSplitted(router.pathname)
    
    const crumbList = asPathSplit.map( (subpath, idx) => {
      const param = pathNameSplit[idx].replace("[", "").replace("]", "");
  
      const href = asPathSplit.slice(0, idx+1).join("/");

      return {
        linkRef      : "/"+href,
        textGenerator: getTextGenrerator(param, router),
        textDefault  : getDefaultTextGenerator(subpath),
      }
    })
    console.log(crumbList);
    return [{ linkRef: "/", textDefault: "Dashboard" }, ...crumbList];
  },[router.asPath, router.pathname, router.query])

  return (
    // separator="&#x2022;" 
    <Breadcrumbs aria-label="breadcrumb">
      {
        breadList.map( (crumb, idx) => (
          <CrumbComponent
            {...crumb}
            key     = {idx}
            last    = {idx === breadList.length-1}
          />
        ))
      }
    </Breadcrumbs>
  )
}

export default BreadcrumbsComponent;