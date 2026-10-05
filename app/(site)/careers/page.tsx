import { HeroPanel } from '@/components/sections/HeroPanel';
import { VacancyCard } from '@/components/sections/VacancyCard';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { getCompanyStats } from '@/lib/data/company';
import { getFeaturedVacancies, getVacancies } from '@/lib/data/vacancies';
import Link from 'next/link';
import React from 'react';



const page = async () => {
    const [stats, vacancies] = await Promise.all([
        getCompanyStats(),
        getVacancies(),
    ]);
    return (
        <div>
            <HeroPanel
                eyebrow={
                    <span className="inline-flex items-center gap-2">
                        <Link href="/" className="text-bone/70 transition-colors hover:text-lime">
                            Home
                        </Link>
                        <span aria-hidden="true" className="text-bone/40">
                            /
                        </span>
                        <span>Career</span>
                    </span>
                }
                title="Join Our Team"
                intro="We are always looking for talented and passionate individuals to join our team. If you are interested in working with us, please check our current job openings below."
                image={{
                    src: "/images/team-group.jpg",
                    alt: "Modern multi-storey building at dusk reflected in a still pool",
                }}
            />

            {/* Vacancies */}
            <section className="bg-bone py-14 md:py-20">
                <Container>
                    <div className="max-w-3xl">
                        <h2 className=" text-3xl font-semibold uppercase  text-lime">Current Openings</h2>

                        <p className="mt-4 text-sm text-base-content">
                            We are currently seeking talented individuals to join our team. If you are interested in any of the positions below, please submit your application.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                        {
                            vacancies.map((vacancy, i) => (
                                <Reveal key={vacancy._id} delay={(i % 3) * 100}>
                                    <VacancyCard vacancy={vacancy} />
                                </Reveal>
                            ))
                        }
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default page;