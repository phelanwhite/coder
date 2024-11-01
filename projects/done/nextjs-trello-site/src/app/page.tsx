import Image from "next/image";
import img1 from "@/asset/img1.png";
import img2 from "@/asset/img2.png";
import clsx from "clsx";

const data1 = [
  {
    title: "Boards",
    content: `Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”`,
  },
  {
    title: "Columns",
    content: `The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.`,
  },
  {
    title: "Tasks",
    content: `Tasks represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.`,
  },
];

export default function Home() {
  return (
    <main className="text-base">
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-20">
          <div className={clsx(`flex gap-8 flex-col lg:flex-row`)}>
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="leading-12 text-3xl md:text-5xl font-medium">
                Trello brings all your tasks, teammates, and tools together
              </div>
              <div className="text-base md:text-xl">
                Keep everything in the same place—even if your team isn’t.
              </div>
            </div>
            <div className="relative w-auto max-w-[500px] mx-auto">
              <Image width={500} alt="" src={img1} loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-20 ">
        <div className="space-y-6">
          <div className="leading-8 font-semibold text-2xl md:text-4xl">
            A productivity powerhouse
          </div>

          <div className="text-base md:text-xl">
            Simple, flexible, and powerful. All it takes are boards, lists, and
            cards to get a clear view of who’s doing what and what needs to get
            done. Learn more in our guide for getting started.
          </div>
          <div className="flex gap-8 flex-col lg:flex-row">
            <div className="space-y-6 flex-1">
              {data1.map((item) => (
                <div
                  key={item.title}
                  className="border-l-4 rounded border-l-blue-500 pl-4"
                >
                  <div className="font-semibold">{item.title}</div>
                  <div>{item.content}</div>
                </div>
              ))}
            </div>
            <div className="relative w-auto">
              <Image width={500} alt="" src={img2} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
