<?php

namespace Database\Seeders;

use App\Models\Capability;
use App\Models\Milestone;
use App\Models\Story;
use Illuminate\Database\Seeder;

class AboutPageSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Story ───────────────────────────────────────────────────────────
        Story::create([
            'title'               => 'Built on Expertise, Driven by Innovation',
            'title_kurdish'       => 'بنیاتنراو لەسەر شارەزایی، بەرێوەبراو بە داهێنان',
            'description'         => 'Rizon Technologies was founded with a single mission: to bridge the gap between cutting-edge technology and real-world industrial needs. From our roots in electrical engineering and SCADA systems, we have grown into a full-spectrum technology partner trusted by energy companies, municipalities, and industrial enterprises across the region. Every project we deliver is backed by decades of combined expertise and an uncompromising commitment to quality.',
            'description_kurdish' => 'تەکنەلۆژیای ریزۆن بە مەبەستێکی تەنها دامەزرا: پڕکردنەوەی بۆشایی نێوان تەکنەلۆژیای پێشکەوتوو و پێداویستییە پیشەسازییە ئەمەزمانییەکان. لە ڕەگەزی ئەندازیاری کارەبا و سیستەمەکانی SCADA، گەشەمان کردووە بۆ هاوبەشێکی تەکنەلۆژیی تەواو کە پشتی دەبەستێت پێی لایەنە وزەیی، شارەوانی، و کۆمپانیا پیشەسازییەکان لەسەر ناوچەکە. هەر پرۆژەیەک کە دەمانگەیەنێت، پاڵپشتی دەکرێت بە دەیان ساڵ شارەزایی یەکگرتوو و پابەندبوونێکی بێ چاوپۆشی بۆ کوالیتی.',
            'sort_order'          => 1,
        ]);

        // ─── Capabilities ─────────────────────────────────────────────────────
        $capabilities = [
            [
                'icon'                => 'fas fa-bolt',
                'title'               => 'Power & Energy Systems',
                'title_kurdish'       => 'سیستەمەکانی وزە و کارەبا',
                'description'         => 'Design and deployment of HV/MV switchgear, substations, and power distribution networks for industrial and commercial clients.',
                'description_kurdish' => 'دیزاین و جێبەجێکردنی سویچگیری HV/MV، وێستگەکان، و تۆڕەکانی دابەشکردنی کارەبا بۆ کڕیارە پیشەسازی و بازرگانییەکان.',
                'sort_order'          => 1,
            ],
            [
                'icon'                => 'fas fa-industry',
                'title'               => 'Industrial Automation',
                'title_kurdish'       => 'ئۆتۆماسیۆنی پیشەسازی',
                'description'         => 'PLC, DCS, and SCADA integration for manufacturing plants, water treatment facilities, and oil & gas operations.',
                'description_kurdish' => 'یەکگرتنی PLC، DCS، و SCADA بۆ کارخانەی بەرهەمهێنان، بنکەی چارەسەرکردنی ئاو، و کارەکانی نەوت و گاز.',
                'sort_order'          => 2,
            ],
            [
                'icon'                => 'fas fa-network-wired',
                'title'               => 'IT & Networking Infrastructure',
                'title_kurdish'       => 'بنەڕەتی IT و تۆڕسازی',
                'description'         => 'Structured cabling, fiber optic deployment, and enterprise networking solutions designed for high availability and security.',
                'description_kurdish' => 'کابڵکێشانی ڕێکخراو، جێبەجێکردنی فایبەر ئۆپتیک، و چارەسەرەکانی تۆڕسازی کۆمپانیا کە بۆ بەردەستبوونی بەرز و ئەمنیەت دیزاین کراون.',
                'sort_order'          => 3,
            ],
            [
                'icon'                => 'fas fa-solar-panel',
                'title'               => 'Renewable Energy Solutions',
                'title_kurdish'       => 'چارەسەرەکانی وزەی نوێکەرەوە',
                'description'         => 'End-to-end solar PV and wind energy project management, from feasibility studies to commissioning and ongoing monitoring.',
                'description_kurdish' => 'بەڕێوەبردنی پرۆژەی وزەی خۆر و با لە سەرەتا تا کۆتایی، لە خوێندنەوەی گونجاوبوون تا کارخستن و چاودێریکردنی بەردەوام.',
                'sort_order'          => 4,
            ],
            [
                'icon'                => 'fas fa-shield-alt',
                'title'               => 'Security & Surveillance',
                'title_kurdish'       => 'ئەمنیەت و چاودێری',
                'description'         => 'IP CCTV systems, access control, fire detection, and integrated security command centres for critical infrastructure.',
                'description_kurdish' => 'سیستەمەکانی CCTV-ی IP، کۆنترۆڵی دەستگەیشتن، دۆزینەوەی ئاگر، و ناوەندەکانی فەرماندەی ئەمنیەتی یەکگرتوو بۆ بنەڕەتی کریتیکی.',
                'sort_order'          => 5,
            ],
            [
                'icon'                => 'fas fa-brain',
                'title'               => 'AI & Data Analytics',
                'title_kurdish'       => 'AI و شیکردنەوەی داتا',
                'description'         => 'Machine learning models for predictive maintenance, energy forecasting, and operational intelligence across industrial assets.',
                'description_kurdish' => 'مۆدێلەکانی فێربوونی مەکینە بۆ چاکسازیی پێشبینیکراو، پێشبینیکردنی وزە، و زیرەکی کارکردی لەسەر داراییە پیشەسازییەکان.',
                'sort_order'          => 6,
            ],
        ];

        foreach ($capabilities as $cap) {
            Capability::create($cap);
        }

        // ─── Milestones ───────────────────────────────────────────────────────
        $milestones = [
            [
                'year'               => 2013,
                'title'              => 'Company Founded',
                'title_kurdish'      => 'دامەزراندنی کۆمپانیا',
                'description'        => 'Rizon Technologies established in Sulaymaniyah with a focus on electrical contracting and substation works.',
                'description_kurdish'=> 'تەکنەلۆژیای ریزۆن لە سلێمانی دامەزرا بە تەرکیزکردن لەسەر پەیمانکاری کارەبا و کارەکانی وێستگە.',
            ],
            [
                'year'               => 2015,
                'title'              => 'First SCADA Deployment',
                'title_kurdish'      => 'یەکەم جێبەجێکردنی SCADA',
                'description'        => 'Successfully commissioned our first large-scale SCADA system for a regional water authority managing 14 pumping stations.',
                'description_kurdish'=> 'یەکەم سیستەمی SCADA-ی فراوانمان بە سەرکەوتوویی کارخست بۆ دەسەڵاتی ئاوی ناوچەیەک کە ١٤ وێستگەی پەمپکردن بەڕێوە دەبرد.',
            ],
            [
                'year'               => 2017,
                'title'              => 'Renewable Energy Division Launched',
                'title_kurdish'      => 'دەستپێکردنی بەشی وزەی نوێکەرەوە',
                'description'        => 'Expanded into solar and wind energy, completing our first 5MW solar farm installation for a private industrial client.',
                'description_kurdish'=> 'فراوانکردن بۆ وزەی خۆر و با، تەواوکردنی یەکەم دامەزراندنی زەوییی خۆرەکەی ٥MW بۆ کڕیارێکی پیشەسازی تایبەت.',
            ],
            [
                'year'               => 2019,
                'title'              => 'ISO 9001 Certification',
                'title_kurdish'      => 'مەزوونبوونی ISO 9001',
                'description'        => 'Achieved ISO 9001:2015 certification, formalising our quality management systems across all service lines.',
                'description_kurdish'=> 'مەزوونبوونی ISO 9001:2015 بەدەستهێنا، ڕەسمیکردنی سیستەمەکانی بەڕێوەبردنی کوالیتیمان لەسەر هەموو هێڵەکانی خزمەتگوزاری.',
            ],
            [
                'year'               => 2021,
                'title'              => 'AI & Analytics Unit Formed',
                'title_kurdish'      => 'دامەزراندنی یەکەی AI و شیکردنەوە',
                'description'        => 'Launched a dedicated data science team to build predictive maintenance and energy optimisation platforms for existing clients.',
                'description_kurdish'=> 'دەستەی زانستی داتای تایبەت ئامادەکرا بۆ دروستکردنی پلاتفۆرمەکانی چاکسازیی پێشبینیکراو و باشترکردنی وزە بۆ کڕیارە ئەمەزمانییەکان.',
            ],
            [
                'year'               => 2023,
                'title'              => '100+ Projects Delivered',
                'title_kurdish'      => 'زیاتر لە ١٠٠ پرۆژە گەیەنرا',
                'description'        => 'Crossed the milestone of 100 successfully completed projects across energy, automation, networking, and smart infrastructure.',
                'description_kurdish'=> 'تێپەڕاندنی نیشانەی ١٠٠ پرۆژەی بە سەرکەوتوویی تەواوکراو لەسەر وزە، ئۆتۆماسیۆن، تۆڕسازی، و بنەڕەتی زیرەک.',
            ],
            [
                'year'               => 2025,
                'title'              => 'Regional Expansion',
                'title_kurdish'      => 'فراوانکردنی ناوچەیی',
                'description'        => 'Opened new offices in Erbil and Baghdad, extending our reach across all of Iraq and into neighbouring markets.',
                'description_kurdish'=> 'کردنەوەی ئۆفیسە نوێیەکان لە هەولێر و بەغدا، فراوانکردنی دەستگەیشتنمان لەسەر هەموو عێراق و بازارە دراوسێیەکان.',
            ],
        ];

        foreach ($milestones as $milestone) {
            Milestone::create($milestone);
        }
    }
}