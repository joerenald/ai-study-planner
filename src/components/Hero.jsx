import React from "react";
import Button from "./Button";

const Hero = ({
title = "Welcome",
subtitle = "",
description = "",
ctaButton = { text: "Get Started", onClick: () => {} },
backgroundImage = null,
visualImage = null,
className = "",
}) => {

const sectionStyle = backgroundImage
? {
backgroundImage: `url(${backgroundImage})`,
backgroundSize: "cover",
backgroundPosition: "center",
}
: {};

return (
<section
className={`w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-200 ${className}`}
style={sectionStyle}
> <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE — TEXT */}
    <div className="text-center lg:text-left">

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
        {title}
      </h1>

      {subtitle && (
        <h2 className="text-xl sm:text-2xl text-gray-700 mb-6">
          {subtitle}
        </h2>
      )}

      {description && (
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
          {description}
        </p>
      )}

      <div className="flex justify-center lg:justify-start">
        <Button
          variant="primary"
          size="lg"
          onClick={ctaButton.onClick}
          className="shadow-lg hover:shadow-xl"
        >
          {ctaButton.text}
        </Button>
      </div>

    </div>

    {/* RIGHT SIDE — VISUAL */}
    <div className="flex justify-center">

      <div className="w-full max-w-md bg-indigo-100 rounded-2xl p-8 shadow-md">

        {visualImage ? (
          <img
            src={visualImage}
            alt="Study planner preview"
            className="w-full h-64 object-cover rounded-lg"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-32 w-32 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <p className="mt-4 text-gray-600 font-medium">
              AI-Powered Study Plans
            </p>
          </div>
        )}

      </div>

    </div>
  </div>
</section>

);
};

export default Hero;
