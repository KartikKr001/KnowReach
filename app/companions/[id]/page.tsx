
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import { getCompanion } from "@/lib/actions/companions.actions";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    if(!companion){
      return redirect('/');
    }
    const user = await currentUser();
    if(!user) redirect('/sign-in');
    const { name, subject, topic, duration } = companion;
    if(!name) redirect('/companions')
 return (
    <main>
      <article className="flex rounded-border justify-between p-4 max-md:flex-col max-md:gap-2 max-h-[120px] overflow-hidden">
        <div className="flex items-center gap-3">
          <div
            className="size-[48px] flex items-center justify-center rounded-md max-md:hidden"
            style={{
              background: `linear-gradient(to right, ${getSubjectColor(subject)[0]}, ${getSubjectColor(subject)[1]})`,
            }}
          >
            <Image src={`/icons/${subject}.svg`} alt={subject} width={24} height={24} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-xl">{name}</p>
              <div className="subject-badge max-sm:hidden text-xs py-0.5 px-2">{subject}</div>
            </div>
            <p className="text-sm">{topic}</p>
          </div>
        </div>

        <div className="items-start text-lg max-md:hidden">{duration} minutes</div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;