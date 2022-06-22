import React from "react";
import "./Button.css";

const onMouseEnter = (event, bgColor) => {
  const el = event.target;
  el.style.backgroundColor = bgColor;
};

const onMouseOut = (event, bgColor) => {
  const el = event.target;
  el.style.backgroundColor = bgColor;
};

export default function Button({ text, className, href, newTab, onClick }) {
  return (
    <div className={className}>
      <a
        class="main-button"
        href={href}
        onClick={onClick}
        target={newTab && "_blank"}
        onMouseEnter={(event) => onMouseEnter(event, "#FFFFFFdb")}
        onMouseOut={(event) => onMouseOut(event, "#FFFFFFF2")}
      >
        {text}
      </a>
    </div>
  );
}
