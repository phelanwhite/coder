import ButtonBookmark from "@/components/common/bookmark/ButtonBookmark";
import PostButtonMenu from "@/components/common/post/PostButtonMenu";
import PostCard from "@/components/common/post/PostCard";
import ResponseCard from "@/components/common/response/ResponseCard";
import ButtonComponent from "@/components/form/button-component";
import { getDateToString } from "@/utils/time";
import clsx from "clsx";
import { MdOutlineModeComment } from "react-icons/md";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const PostIdPage = () => {
  return (
    <div>
      <section className="max-w-screen-md mx-auto space-y-8 px-5">
        {/* title  */}
        <div className="font-bold text-3xl">
          How to Use React Hook Form + Zod with Next.js Server Actions
        </div>
        {/* author  */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center text-sm font-medium ">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*6SeA62K_4RKocHWYjnXZlw.jpeg"
                loading="lazy"
                alt=""
              />
            </div>
            <div>
              <div className="">
                <Link to={`/author/:id`} className="hover:underline">
                  Monique McIntyre
                </Link>
              </div>
              <div className="mt-1 text-text-secondary-color text-xs flex items-center gap-1">
                <span>11 min read</span>
                <span className="inline-block w-1 h-1 overflow-hidden rounded-full "></span>
                <span>{getDateToString(new Date().toDateString())}</span>
              </div>
            </div>
          </div>

          <ButtonComponent color="black" className="rounded-full" size="xs">
            Follow
          </ButtonComponent>
        </div>
        {/* action  */}
        <div className="p-2 border-y">
          <div className={clsx("flex items-center justify-between")}>
            <div className="text-text-secondary-color text-sm flex items-center gap-3">
              <span className="flex items-center ">
                <PiHandsClappingDuotone />
                115
              </span>
              <span className="flex items-center ">
                <MdOutlineModeComment />
                15
              </span>
            </div>
            {/* action  */}
            <div className="flex items-center gap-3 text-xl">
              <ButtonBookmark />
              <PostButtonMenu />
            </div>
          </div>
        </div>
        {/* thumbnail */}
        <div>
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*6SeA62K_4RKocHWYjnXZlw.jpeg"
            loading="lazy"
            alt=""
          />
        </div>
        {/* description  */}
        <div>
          Handling form validations natively in React can be cumbersome and
          time-consuming — something you’ve probably experienced firsthand.
          Fortunately, by using React Hook Form and Zod together, you can
          streamline this process and kiss your struggles goodbye. 😌 Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Et voluptas maiores
          temporibus, labore accusantium commodi in amet, inventore iste illo
          debitis. Dignissimos fugiat magnam nostrum, unde voluptas sunt
          inventore vel? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. At, vitae. Rem aut commodi incidunt unde et dolorum minus
          architecto quaerat reprehenderit totam. Sequi quos nulla distinctio
          eveniet architecto, soluta omnis.
        </div>
        {/* topics  */}
        <div>
          <ul className="flex flex-wrap items-center gap-2">
            {[
              `Artificial Intelligence`,
              `Python`,
              `JavaScript`,
              `Coding`,
              `React`,
            ].map((item) => (
              <li key={item}>
                <Link
                  className="inline-block text-xs px-4 py-2 rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200"
                  to={`/`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Link article */}
        <div>
          <span>Link article: </span>
          <a href="https://dev.to/nikit/setting-up-chakra-ui-in-a-next-js-project-1ehi">
            https://dev.to/nikit/setting-up-chakra-ui-in-a-next-js-project-1ehi
          </a>
        </div>
      </section>
      <section className="mt-16 max-w-screen-md mx-auto py-16">
        <div className="px-5 font-semibold text-2xl mb-10">
          More from Monique McIntyre
        </div>
        <ul className="grid sm:grid-cols-2 gap-y-12">
          <li>
            <PostCard typePost="post3" />
          </li>
          <li>
            <PostCard typePost="post3" />
          </li>
          <li>
            <PostCard typePost="post3" />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PostIdPage;
