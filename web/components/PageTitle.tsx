import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type GoBackTitleProps = {
    children: string;
    goBackTo?: string;
}

export function PageTitle({ children, goBackTo }: GoBackTitleProps) {
    return (
        <div className="flex gap-3 items-center p-3 pb-0">
            {goBackTo ?
                <Link href={goBackTo} className="primary-button primary-button-always-enabled">
                    <FiArrowLeft size={20} />
                </Link>
            : null}
            <h2>{ children }</h2>
        </div>
    );
}