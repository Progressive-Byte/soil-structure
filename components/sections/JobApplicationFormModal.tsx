"use client";

import { useState } from "react";
import {
    FiCheckCircle,
    FiFileText,
    FiLoader,
    FiUploadCloud,
} from "react-icons/fi";
import { Button } from "../ui/Button";

import type { Vacancy } from "@/lib/data/vacancies";

type JobApplicationFormProps = {
    vacancy: Vacancy;
};

const JobApplicationForm = ({
    vacancy,
}: JobApplicationFormProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");

    const handleOpen = () => {
        setIsOpen(true);
        setSuccess(false);
        setError("");
    };

    const handleClose = () => {
        if (loading) return;

        setIsOpen(false);
        setSuccess(false);
        setError("");
        setFileName("");
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            setFileName("");
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError("CV file size must be less than 5MB.");
            event.target.value = "";
            setFileName("");
            return;
        }

        setError("");
        setFileName(file.name);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setLoading(true);
        setError("");
        setSuccess(false);

        const form = event.currentTarget;
        const formData = new FormData(form);

        formData.append("vacancy", vacancy._id);
        formData.append("vacancyTitle", vacancy.title);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/public/careers/applications`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to submit application.");

            setSuccess(true);
            setFileName("");
            form.reset();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Apply Now Button */}
            <Button
                type="button"
                variant="dark"
                size="lg"
                withArrow
                className="self-start lg:self-auto"
                onClick={handleOpen}
            >
                Apply Now
            </Button>

            {/* Application Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] overflow-y-hidden bg-ink/70 px-4 py-6 backdrop-blur-sm "
                    onClick={handleClose}
                >
                    <div
                        className="mx-auto w-full max-w-5xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="overflow-hidden rounded-2xl border border-line bg-bone shadow-card-dark">

                            {/* Modal Header */}
                            <div className="flex items-start justify-between border-line bg-lime">
                                <div className="pr-6">
                                    <div className="border-b border-line bg-lime p-4 md:p-5">
                                            <p className="text-eyebrow font-semibold uppercase text-ink/90">
                                                Applying For
                                            </p>

                                            <h3 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
                                                {vacancy.title}
                                            </h3>
                                        </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={loading}
                                    aria-label="Close application form"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl text-ink transition hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:opacity-50 m-6 md:m-8"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="max-h-[calc(100vh-180px)] overflow-y-auto p-6 md:p-10">

                                <div className="mx-auto max-w-3xl">
                                    

                                    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">

                                        {/* Selected Position */}
                                        

                                        <div className="p-6 md:p-10">

                                            {success && (
                                                <div className="mb-8 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-5 text-green-800">
                                                    <FiCheckCircle className="mt-0.5 shrink-0 text-xl" />

                                                    <div>
                                                        <p className="font-semibold">
                                                            Application submitted successfully!
                                                        </p>

                                                        <p className="mt-1 text-sm leading-relaxed">
                                                            Thank you for applying. Our team will
                                                            review your application and contact you
                                                            if you are shortlisted.
                                                        </p>

                                                        <button
                                                            type="button"
                                                            onClick={handleClose}
                                                            className="mt-4 border border-green-300 px-4 py-2 text-sm font-semibold transition hover:bg-green-100"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {error && (
                                                <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm leading-relaxed text-red-700">
                                                    {error}
                                                </div>
                                            )}

                                            {!success && (
                                                <form
                                                    onSubmit={handleSubmit}
                                                    className="space-y-10"
                                                >

                                                    {/* Personal Information */}
                                                    <div>
                                                        <div className="mb-6">
                                                            <h3 className="font-heading text-xl font-bold text-ink md:text-2xl">
                                                                Personal Information
                                                            </h3>

                                                            <p className="mt-1 text-sm text-muted">
                                                                Please provide your basic contact
                                                                information.
                                                            </p>
                                                        </div>

                                                        <div className="grid gap-6 md:grid-cols-2">

                                                            {/* Full Name */}
                                                            <div>
                                                                <label
                                                                    htmlFor="name"
                                                                    className="mb-2 block text-sm font-semibold text-ink"
                                                                >
                                                                    Full Name *
                                                                </label>

                                                                <input
                                                                    id="name"
                                                                    name="name"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Enter your full name"
                                                                    className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lime-700 focus:ring-1 focus:ring-lime-700"
                                                                />
                                                            </div>

                                                            {/* Email */}
                                                            <div>
                                                                <label
                                                                    htmlFor="email"
                                                                    className="mb-2 block text-sm font-semibold text-ink"
                                                                >
                                                                    Email Address *
                                                                </label>

                                                                <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    required
                                                                    placeholder="you@example.com"
                                                                    className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lime-700 focus:ring-1 focus:ring-lime-700"
                                                                />
                                                            </div>

                                                            {/* Phone */}
                                                            <div>
                                                                <label
                                                                    htmlFor="phone"
                                                                    className="mb-2 block text-sm font-semibold text-ink"
                                                                >
                                                                    Phone Number *
                                                                </label>

                                                                <input
                                                                    id="phone"
                                                                    name="phone"
                                                                    type="tel"
                                                                    required
                                                                    placeholder="+880 1XXXXXXXXX"
                                                                    className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lime-700 focus:ring-1 focus:ring-lime-700"
                                                                />
                                                            </div>

                                                            {/* Location */}
                                                            <div>
                                                                <label
                                                                    htmlFor="location"
                                                                    className="mb-2 block text-sm font-semibold text-ink"
                                                                >
                                                                    Current Location *
                                                                </label>

                                                                <input
                                                                    id="location"
                                                                    name="location"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Dhaka, Bangladesh"
                                                                    className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-lime-700 focus:ring-1 focus:ring-lime-700"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Cover Letter */}
                                                    <div className="border-t border-line pt-10">

                                                        <label
                                                            htmlFor="coverLetter"
                                                            className="mb-2 block text-sm font-semibold text-ink"
                                                        >
                                                            Why should we consider you? *
                                                        </label>

                                                        <textarea
                                                            id="coverLetter"
                                                            name="coverLetter"
                                                            required
                                                            rows={7}
                                                            placeholder="Tell us about your relevant experience, skills, achievements, and why you are interested in this position..."
                                                            className="w-full resize-none rounded-lg border border-line bg-white px-4 py-3 text-sm leading-relaxed text-ink outline-none transition placeholder:text-muted/60 focus:border-lime-700 focus:ring-1 focus:ring-lime-700"
                                                        />
                                                    </div>

                                                    {/* CV Upload */}
                                                    <div className="border-t border-line pt-10">

                                                        <label
                                                            htmlFor="cv"
                                                            className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-bone/50 px-6 py-10 text-center transition hover:border-lime-700 hover:bg-bone"
                                                        >
                                                            {fileName ? (
                                                                <>
                                                                    <FiFileText className="mb-3 text-3xl text-lime-700" />

                                                                    <span className="text-sm font-semibold text-ink">
                                                                        {fileName}
                                                                    </span>

                                                                    <span className="mt-1 text-xs text-muted">
                                                                        Click to replace your CV
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FiUploadCloud className="mb-3 text-3xl text-muted transition group-hover:text-lime-700" />

                                                                    <span className="text-sm font-semibold text-ink">
                                                                        Click to upload your CV
                                                                    </span>

                                                                    <span className="mt-2 text-xs text-muted">
                                                                        PDF, DOC or DOCX · Maximum 5MB
                                                                    </span>
                                                                </>
                                                            )}

                                                            <input
                                                                id="cv"
                                                                name="cv"
                                                                type="file"
                                                                required
                                                                accept=".pdf,.doc,.docx"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>

                                                    {/* Submit */}
                                                    <div className="border-t border-line pt-8">
                                                        <Button
                                                            type="submit"
                                                            variant="lime"
                                                            size="md"
                                                            className="w-full"
                                                            disabled={loading}
                                                        >
                                                            {loading ? (
                                                                <>
                                                                    <FiLoader className="animate-spin" />
                                                                    Submitting Application...
                                                                </>
                                                            ) : (
                                                                "Submit Application"
                                                            )}
                                                        </Button>

                                                        <p className="mt-4 text-center text-xs leading-relaxed text-muted">
                                                            By submitting this application, you confirm
                                                            that the information provided is accurate
                                                            and complete.
                                                        </p>
                                                    </div>

                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default JobApplicationForm;
