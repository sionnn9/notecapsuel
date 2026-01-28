import { FaRocket, FaPlusCircle, FaEdit, FaThList } from "react-icons/fa";

const Step = ({ number, title, text, icon: Icon }: any) => (
  <div className="group relative flex gap-8 pb-12 last:pb-0">
    {/* Connecting Line */}
    <div className="absolute left-[23px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/50 to-transparent group-last:hidden" />

    {/* Number/Icon Circle */}
    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-[#111] shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-blue-500/40">
      <span className="text-blue-400 font-bold">{number}</span>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-1 pt-1">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-blue-400/80 text-sm" />}
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-300 leading-relaxed max-w-md">{text}</p>
    </div>
  </div>
);

const Instructions = () => {
  return (
    <div className="min-h-screen  py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-sm shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">
          How to get <span className="text-blue-500">Started</span>
        </h2>

        <div className="flex flex-col">
          <Step
            number="1"
            icon={FaRocket}
            title="Launch Dashboard"
            text="Click on “Start Using App” to open your personal notes dashboard and sync your workspace."
          />
          <Step
            number="2"
            icon={FaPlusCircle}
            title="Capture Thoughts"
            text="Create a new note instantly. Give it a title and let your ideas flow into the editor."
          />
          <Step
            number="3"
            icon={FaEdit}
            title="Manage & Refine"
            text="Keep your content fresh. Update details on the fly or clear space using the instant delete icon."
          />
          <Step
            number="4"
            icon={FaThList}
            title="Stay Organized"
            text="Access your library in one beautiful view, sorted by creation date for easy retrieval."
          />
        </div>
      </div>
    </div>
  );
};

export default Instructions;
