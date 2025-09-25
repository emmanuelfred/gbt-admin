import React from "react";

const menu = [
  {
    title: "Role Management",
    icon: "./icon/1.PNG",
    pages: [
      {
        pageName: "Add Role",
        pageLink: "/add_role",
      },
      {
        pageName: "Role",
        pageLink: "/role",
      },
    ],
  },
  {
    title: "CBT Management",
    icon: "./icon/3.PNG",
    pages: [
    
       {
        pageName: "Add Subject",
        pageLink: "/add_subject",
      },
       {
        pageName: "Add Topic",
        pageLink: "/add_topic",
      },
        {
        pageName: "Add Question",
        pageLink: "/add_question",
      },
      {
        pageName: "Questions Management",
        pageLink: "/questions",
      },
    ],
  },
    {
    title: "Staff Management",
    icon: "./icon/5.PNG",
    pages: [
      {
        pageName: "Add Staff",
        pageLink: "/add_staff",
      },
      {
        pageName: "Questions Management",
        pageLink: "/questions",
      },
    ],
  },
];

function Sidebar() {
  return (
    <ul>
      {menu.map((section, index) => (
        <li key={index} >
          {/* Section Title */}
          <div className="">
            <img src={section.icon} alt={section.title}  />
            <span className="text-secondar">{section.title}</span>
          </div>

          {/* Section Pages */}
          <ul >
            {section.pages.map((page, idx) => (
              <li key={idx} >
                <a href={page.pageLink} className="text-blue-600 hover:underline">
                  {page.pageName}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
