"use client";

import { useState } from "react";
import type { Vacancy } from "@/lib/data/vacancies";
import JobApplicationForm from "./JobApplicationFormModal";

type VacancyApplicationProps = {
    vacancy: Vacancy;
};

const VacancyApplication = ({
    vacancy,
}: VacancyApplicationProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    console.log("Apply Now clicked");
                    setIsOpen(true);
                }}
                className="inline-flex items-center justify-center bg-lime px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lime-700"
            >
                Apply Now
            </button>

            <JobApplicationForm
                vacancy={vacancy}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};

export default VacancyApplication;