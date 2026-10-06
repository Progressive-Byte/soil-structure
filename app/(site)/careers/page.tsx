import { HeroPanel } from '@/components/sections/HeroPanel';
import { VacancyCard } from '@/components/sections/VacancyCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { getCompanyStats } from '@/lib/data/company';
import { getFeaturedVacancies, getVacancies, Vacancy } from '@/lib/data/vacancies';
import Link from 'next/link';
import React from 'react';
import { BiArrowToBottom } from 'react-icons/bi';

type VacancyProps = {
    vacancies: Vacancy[];
};

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
                actions={
                    <>
                        <Button href="#vacancies" variant="lime" className="motion-safe:animate-btn-pulse">
                            See Open Positions <span><BiArrowToBottom></BiArrowToBottom></span>
                        </Button>
                    </>     
                }
                compact
            />


            {/* Vacancies */}
            <section className="bg-bone py-14 md:py-20">
                <Container>
                    <div className="max-w-3xl">
                        <h2 className="font-heading text-display-sm font-bold tracking-tight text-ink md:text-display-md">Current Vacancies</h2>

                    </div>
                    <div id='vacancies' className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
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