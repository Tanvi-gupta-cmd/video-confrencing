import {
  FaVideo,
  FaComments,
  FaDesktop,
  FaShieldAlt,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaVideo size={38} />,
      title: "HD Video Calls",
      desc: "Crystal clear meetings with high-quality audio and video.",
    },
    {
      icon: <FaComments size={38} />,
      title: "Live Chat",
      desc: "Instant messaging during meetings for smooth collaboration.",
    },
    {
      icon: <FaDesktop size={38} />,
      title: "Screen Sharing",
      desc: "Present your screen securely with one click.",
    },
    {
      icon: <FaShieldAlt size={38} />,
      title: "Secure Meetings",
      desc: "Protected by encrypted connections and secure authentication.",
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-slate-900">
          Powerful Features
        </h2>

        <p className="text-center text-slate-500 mt-4 text-lg">
          Everything you need for seamless online collaboration.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-8 text-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-slate-500 mt-4 leading-7">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;