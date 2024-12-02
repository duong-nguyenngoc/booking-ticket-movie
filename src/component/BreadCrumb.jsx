import React from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import useBreadCrumbs from "use-react-router-breadcrumbs";

const routes = [
  {
    path: "/admin/user",
    breadcrumb: "User Managment",
  },
  {
    path: "/admin/movie",
    breadcrumb: "Movie Managment",
  },
];

export default function BreadCrumb() {
  const breadcrumbs = useBreadCrumbs(routes);
  return (
    <>
      <BreadCrumb>
        {breadcrumbs.slice(2).map(({ breadcrumb, match }, index) => {
          return (
            <Breadcrumb.Item key={index}>
              <NavLink to={match.pathname}>{breadcrumb}</NavLink>
            </Breadcrumb.Item>
          );
        })}
      </BreadCrumb>
    </>
  );
}
