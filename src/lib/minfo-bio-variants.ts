const BIO_HEADER = `[**Bio**](https://portofliokarak.vercel.app/blog/minfo)

→
September 27, 2020 \\| Reading time: 8 minutes
`;

const BIO_VARIANT_BODIES = [
  `An obsessive misreader of (other) people’s minds, Abhijith spends his free time away from civilisation in a house built on the banks of Subarnarekha (by early goldminers looking to perfect the art of washing their gamchas in the silty waters).

He chanced upon a diploma in graphic design at a design school in Paldi, Ahmedabad after five years of trying to centre-align monospaced type (a good part of those years spent in mostly harmless pushing of pixels and pencils). For another three and a half years, he worked as hired muscle moving nodes — and bezier curves — to some semblance of order.

Post an indecent amount of time spent away from interesting geography, he signed up for another stint with classrooms and thumbprint-driven attendance-marking, this time at a facility surrounded by protected forests, faux-baroque architecture, and a treacherous lake masquerading as scenery.`,
  `After a short stint as a mural painter and writer of soapy, sentimental speeches, Abhijith studied Graphic Design at NID, Ahmedabad, and moved into a small studio in Gurgaon doing DTP, drawing logos, letterforms, feeding dogs and cleaning up cat-litter-trays.

That way of life was cut short when he heard a group of street musicians on a slow-moving train playing the song “Varuvaanillarumee…”. These days he spends his time between Mumbai and Kozhikode and middle-of-nowhere in Vijayawada trading in trivia and made-up personal history lessons.

He is an amateur letterpress printmaker, single-speed cyclist and a fan of 18th century ceiling fans. He dwells in irony and lives with seven cats in a repurposed shipping container called “Nebuchadnezzar 1.”`,
  `Abhijith lives in a cabin three-fourths the way up a hill in the Nilgiri ranges, inaccessible by motored transport. It is always 4 in the morning up there and the rain falls in diagonals, making umbrellas look like surrealist jokes.

After graduating from the National Institute of Design, he worked for a studio in Gurgaon, pushing pixels and pedals. It is there in a back alley of Chattarpur he met Kalyani and decided to call it quits.

Every year in December, he makes the trip down to the plains and spends time roaming the cities for three weeks, meeting clients from the past year and visiting friends in the civilised world.`,
  `Abhijith spent his childhood in a boat moored 200 kilometres into the Arabian Sea and grew up wrestling crocodiles and goldfish. At the ripe old age of seventeen, he joined a travelling circus and looked after their numerous cats and even bigger cats to earn a living.

In-between shows, he designed and printed tickets for the next day, fliers and single-colour posters for the next venue and managed the cat-litter infrastructure with crude imitations of Microsoft Excel put together over tea breaks.

He wishes he could tell prospective clients where he is going next, but cheaping out on a ten-year old pre-smart smartphone restricts location awareness to deciphering faded shop-signs in the twilight hours before the day’s driving begins.`,
];

export const MINFO_BIO_VARIANTS = BIO_VARIANT_BODIES.map(
  (body) => `${BIO_HEADER}\n\n${body}`.trim(),
);
