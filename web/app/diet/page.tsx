'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

type DietType = 'veg' | 'nonVeg';

interface MealPlan {
  theme: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  hydration: string;
  movement: string;
  tip: string;
}

const sanitizeDay = (value: number | null): number => {
  if (!value || Number.isNaN(value)) {
    return 1;
  }
  return Math.min(Math.max(value, 1), 30);
};

const vegTemplates: MealPlan[] = [
  {
    theme: 'Fiber-first + low-GI start',
    breakfast: '🌅 Steel-cut oats in almond milk + chia + 5 soaked almonds + 1 apple (~420 kcal)',
    lunch: '🥗 Brown rice (1 cup) + moong dal tadka + spinach-cucumber kosambari (~540 kcal)',
    dinner: '🍛 2 multigrain rotis + lauki chana dal + mint raita (~520 kcal)',
    snacks: '🥤 Spiced buttermilk + roasted chana (30 g) + 2 walnuts (~250 kcal)',
    hydration: '2.7 L water + tulsi-infused glass at 4 pm',
    movement: '8,000 steps + 12-min post-meal walks',
    tip: 'Open meals with raw salad to blunt glucose spikes.',
  },
  {
    theme: 'Plant protein & probiotic day',
    breakfast: '🥞 Besan chilla stuffed with paneer + tomato chutney + amla shot (~430 kcal)',
    lunch: '🍚 Red rice poha with veggies + peanut curd raita (~500 kcal)',
    dinner: '🥣 Quinoa khichdi with rainbow veggies + cucumber mint buttermilk (~520 kcal)',
    snacks: '🍧 Greek yogurt + flaxseed + guava slices (~280 kcal)',
    hydration: '3.0 L water + jeera water mid-morning',
    movement: '45-min yoga flow + 6,000 steps',
    tip: 'Box-breathing before bed to lower cortisol.',
  },
  {
    theme: 'Millet focus + iron boost',
    breakfast: '🌾 Ragi porridge with dates paste + pumpkin seeds (~400 kcal)',
    lunch: '🥙 Bajra roti (2) + rajma curry + beetroot salad (~560 kcal)',
    dinner: '🍜 Foxtail millet upma + sautéed beans & carrots (~500 kcal)',
    snacks: '🥥 Tender coconut water + hummus with veggie sticks (~250 kcal)',
    hydration: '2.8 L water + lemon-cumin water at dawn',
    movement: '10k steps + 15-min resistance bands',
    tip: 'Pair vitamin C fruit with iron meals for better absorption.',
  },
  {
    theme: 'South Indian gut reset',
    breakfast: '🍽️ Idli (3) with podi + veggie-loaded sambar (~430 kcal)',
    lunch: '🍛 Red matta rice + drumstick sambar + cabbage thoran (~540 kcal)',
    dinner: '🥥 Vegetable stew (light coconut) + appam (2) (~520 kcal)',
    snacks: '🥜 Ginger buttermilk + roasted peanuts (20 g) (~230 kcal)',
    hydration: '3.0 L water + warm jeera-ajwain water post meals',
    movement: '20-min cycling + 7k steps',
    tip: 'Chew every bite 20+ times to aid digestion.',
  },
  {
    theme: 'Detox green plate',
    breakfast: '🥬 Moringa millet dosa + mint chutney + musk melon (~420 kcal)',
    lunch: '🥗 Quinoa salad with edamame, cucumbers, sesame dressing (~520 kcal)',
    dinner: '🍲 Palak tofu curry + red rice (1 cup) + beet raita (~540 kcal)',
    snacks: '🥤 Spinach-apple smoothie + sunflower seeds (~260 kcal)',
    hydration: '3.0 L water + cucumber-infused flask',
    movement: '9k steps + 10-min mobility drills',
    tip: 'Finish dinner 3 hours before bedtime for better fasting glucose.',
  },
  {
    theme: 'Hormone-friendly satiety day',
    breakfast: '🥣 Overnight chia pudding with saffron + pistachios + berries (~430 kcal)',
    lunch: '🌯 Whole-wheat veggie wrap with hummus, avocado, sprouts (~500 kcal)',
    dinner: '🥦 Moong sprout stir-fry + jowar roti (2) + carrot slaw (~520 kcal)',
    snacks: '🍪 Jaggery-free til laddoo + lemongrass tea (~250 kcal)',
    hydration: '2.6 L water + warm water before meals',
    movement: 'Pilates 30 min + 6k steps',
    tip: '5-min gratitude journaling after dinner to improve sleep.',
  },
  {
    theme: 'Thyroid support & selenium',
    breakfast: '🥞 Buckwheat pancakes + walnut butter + kiwi (~440 kcal)',
    lunch: '🍛 Sambar rice (hand-polished) + drumstick leaves stir fry (~530 kcal)',
    dinner: '🌶️ Stuffed capsicum with quinoa-paneer + tomato shorba (~510 kcal)',
    snacks: '🌰 Brazil nuts (2) + spiced coconut water + carrot sticks (~250 kcal)',
    hydration: '2.9 L water + pink-salt lime shot at noon',
    movement: '9k steps + wall sits every 2 hrs',
    tip: 'Morning sunlight exposure to support thyroid rhythm.',
  },
  {
    theme: 'Satvik anti-inflammatory day',
    breakfast: '🍚 Sabudana khichdi (controlled portion) + papaya (~430 kcal)',
    lunch: '🥣 Barnyard millet curd rice with pomegranate + okra stir-fry (~520 kcal)',
    dinner: '🎃 Pumpkin soup + methi thepla (2) + cucumber salad (~500 kcal)',
    snacks: '🍵 Herbal tea + ghee-roasted fox nuts (~240 kcal)',
    hydration: '3.0 L warm water + ginger-turmeric shot',
    movement: 'Sun salutations x24 + 7k steps',
    tip: 'Digital sunset 30 min before bed to support leptin.',
  },
  {
    theme: 'Legume rotation + B12 focus',
    breakfast: '🥗 Sprouted moong salad with pomegranate + coconut (~400 kcal)',
    lunch: '🍛 Low-oil chole + brown rice + kachumber (~560 kcal)',
    dinner: '🥮 Vegetable handvo + mint chutney + probiotic kadhi (~520 kcal)',
    snacks: '🍘 Ragi crackers + peanut butter + buttermilk (~260 kcal)',
    hydration: '2.8 L water + fennel tea after dinner',
    movement: 'Interval walk 1-min fast/slow x15 + 8k steps',
    tip: 'Stand for 5 min every hour to improve NEAT.',
  },
  {
    theme: 'Weekend prep & mindful eating',
    breakfast: '🥚 Chickpea “omelette” with spinach + toast + orange slices (~430 kcal)',
    lunch: '🍲 Veg biryani (brown basmati) + cucumber raita (~550 kcal)',
    dinner: '🥗 Zucchini noodles with pesto paneer + rocket salad (~500 kcal)',
    snacks: '🥤 Date-walnut smoothie + chia lemonade (~260 kcal)',
    hydration: '3.0 L water + hibiscus tea evening',
    movement: 'Nature walk 60 min + meal planning ritual',
    tip: 'Plate: ½ veggies, ¼ protein, ¼ smart carbs every meal.',
  },
];

const nonVegTemplates: MealPlan[] = [
  {
    theme: 'Omega-3 & fiber balance',
    breakfast: '🌅 Masala oats + 2 egg whites + flaxseed chutney (~430 kcal)',
    lunch: '🥗 Brown rice + tandoori chicken breast + sautéed greens (~550 kcal)',
    dinner: '🍛 Quinoa pulao + grilled fish tikka + cucumber raita (~520 kcal)',
    snacks: '🥤 Buttermilk + walnuts + cucumber slices (~240 kcal)',
    hydration: '3.0 L water + jeera water on waking',
    movement: '8.5k steps + 15-min resistance bands',
    tip: 'Add 1 tsp ghee on lunch rice for fat-soluble vitamins.',
  },
  {
    theme: 'High-protein South Indian day',
    breakfast: '🥞 Ragi dosa + egg bhurji + tomato chutney (~440 kcal)',
    lunch: '🍛 Kerala red rice + seer fish curry + beans thoran (~560 kcal)',
    dinner: '🥣 Chicken stew with veggies + appam (2) (~520 kcal)',
    snacks: '🍧 Greek yogurt + roasted chana + guava (~240 kcal)',
    hydration: '2.8 L water + moringa tea evening',
    movement: '7k steps + 20-min cycling',
    tip: 'Keep dinner before 8 pm for better fasting sugar.',
  },
  {
    theme: 'Lean meats + millet rotation',
    breakfast: '🍳 2 boiled eggs + jowar veggie upma + kiwi (~430 kcal)',
    lunch: '🌯 Millet roti (2) + turkey keema + mixed salad (~540 kcal)',
    dinner: '🍲 Brown rice congee + stir-fried prawns + broccoli (~520 kcal)',
    snacks: '🥤 Whey protein smoothie + almonds (~260 kcal)',
    hydration: '3.0 L water + pink-salt electrolyte post-workout',
    movement: '10k steps + 12-min HIIT',
    tip: 'Finish with contrast shower to aid recovery.',
  },
  {
    theme: 'Gut-friendly bone broth',
    breakfast: '🌯 Moong dal chilla + egg-white scramble + amla (~420 kcal)',
    lunch: '🥗 Quinoa tabbouleh + chicken tikka + mint yogurt (~530 kcal)',
    dinner: '🍜 Bone broth soup + baked fish + sautéed zucchini (~500 kcal)',
    snacks: '🥛 Kefir + pumpkin seeds + pear (~250 kcal)',
    hydration: '2.9 L water + broth cup at 5 pm',
    movement: 'Pilates 25 min + 6k steps',
    tip: 'Chew slowly to activate digestive enzymes.',
  },
  {
    theme: 'Metabolic reset with seafood',
    breakfast: '🍽️ Poha with peanuts + boiled egg + coconut chutney (~430 kcal)',
    lunch: '🐟 Steamed red snapper + garlic spinach + millet rice (~520 kcal)',
    dinner: '🥣 Egg drop soup + tofu & mushroom stir-fry + brown rice (~520 kcal)',
    snacks: '🥤 Buttermilk + seed trail mix (~260 kcal)',
    hydration: '3.0 L water + lemon-ginger infusion',
    movement: 'Swim / brisk walk 30 min + 7k steps',
    tip: 'Keep sodium <2 g; prefer rock salt.',
  },
  {
    theme: 'Hypertrophy-friendly macros',
    breakfast: '🍞 Multigrain toast + avocado mash + smoked salmon (~450 kcal)',
    lunch: '🥗 Chicken quinoa burrito bowl with beans & salsa (~560 kcal)',
    dinner: '🍢 Grilled paneer & prawn skewers + millet salad (~520 kcal)',
    snacks: '🍪 Dates + whey laddoo + coconut water (~260 kcal)',
    hydration: '3.2 L water + BCAA during training',
    movement: 'Strength session 40 min + 6k steps',
    tip: 'Magnesium foot soak before sleep.',
  },
  {
    theme: 'Immune support & spice therapy',
    breakfast: '🍳 Turmeric scrambled eggs + ragi roti + pomegranate (~430 kcal)',
    lunch: '🍛 Methi chicken curry (lean) + brown rice + kachumber (~550 kcal)',
    dinner: '🐟 Lemon coriander fish + asparagus + quinoa (~520 kcal)',
    snacks: '🥛 Haldi latte (almond milk) + pistachios (~250 kcal)',
    hydration: '2.8 L water + tulsi tea noon',
    movement: '8k steps + 10-min pranayama',
    tip: 'Midday sun for vitamin D synthesis.',
  },
  {
    theme: 'Weekend grill & prep',
    breakfast: '🥤 Oats smoothie + peanut butter + boiled egg (~420 kcal)',
    lunch: '🍤 Tandoori prawns + millet salad + hung curd dip (~530 kcal)',
    dinner: '🌯 Chicken lettuce wraps + brown rice noodle soup (~520 kcal)',
    snacks: '🍎 Apple slices + almond butter + lime soda (~240 kcal)',
    hydration: '3.0 L water + cinnamon water morning',
    movement: 'Hike / long walk 60 min',
    tip: 'Plan next week meals right after dinner.',
  },
  {
    theme: 'Ayurvedic balance + lamb',
    breakfast: '🥣 Sabudana upma + spiced buttermilk + boiled egg (~430 kcal)',
    lunch: '🍲 Lean mutton stew + red rice + salad (~560 kcal)',
    dinner: '🥣 Moong dal soup + grilled fish + greens (~500 kcal)',
    snacks: '🍵 Dates (2) + sesame seeds + herbal tea (~230 kcal)',
    hydration: '2.7 L water + coriander seed water at night',
    movement: '9k steps + light weights 20 min',
    tip: 'Oil pulling on waking to reduce inflammation.',
  },
  {
    theme: 'Metabolic flex & fasting support',
    breakfast: '🍳 Paneer & egg-white bhurji + multigrain toast + orange (~450 kcal)',
    lunch: '🐟 Sardine curry + ragi mudde + cucumber salad (~550 kcal)',
    dinner: '🍝 Turkey meatballs in tomato gravy + zucchini noodles (~500 kcal)',
    snacks: '🥤 Chaas + roasted makhana + walnut (~250 kcal)',
    hydration: '3.0 L water + ACV shot before lunch',
    movement: 'Sprint intervals (alternate day) + 7k steps',
    tip: 'Stop caffeine after 2 pm to protect deep sleep.',
  },
];

const buildPlanMap = (templates: MealPlan[]): Record<number, MealPlan> => {
  const plan: Record<number, MealPlan> = {};
  for (let day = 1; day <= 30; day += 1) {
    const template = templates[(day - 1) % templates.length];
    plan[day] = { ...template };
  }
  return plan;
};

const dietPlans: Record<DietType, Record<number, MealPlan>> = {
  veg: buildPlanMap(vegTemplates),
  nonVeg: buildPlanMap(nonVegTemplates),
};

const tierWhitelist = [
  'remission pro',
  'remission-pro',
  'remissionpro',
  'lion heart',
  'lion-heart',
  'lionheart',
  'palladium',
  'gold membership',
  'gold member',
  'platinum',
  'elite',
];

const dayOptions = Array.from({ length: 30 }, (_, index) => index + 1);

function DietContent() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const dayParamRaw = searchParams.get('day');
  const dietParamRaw = searchParams.get('diet');
  const tierParamRaw = searchParams.get('tier') || searchParams.get('plan') || searchParams.get('package');
  const previewMode = ['1', 'true', 'preview'].includes((searchParams.get('preview') || '').toLowerCase());

  const [selectedDay, setSelectedDay] = useState(() => sanitizeDay(dayParamRaw ? Number(dayParamRaw) : null));
  const [dietType, setDietType] = useState<DietType>(dietParamRaw === 'nonVeg' ? 'nonVeg' : 'veg');
  const [tier, setTier] = useState<string>('');

  useEffect(() => {
    const nextDay = sanitizeDay(dayParamRaw ? Number(dayParamRaw) : null);
    if (nextDay !== selectedDay) {
      setSelectedDay(nextDay);
    }

    const nextDiet = dietParamRaw === 'nonVeg' ? 'nonVeg' : 'veg';
    if (nextDiet !== dietType) {
      setDietType(nextDiet);
    }

    if (typeof window !== 'undefined') {
      const storedTier = window.localStorage.getItem('dietAccessTier');
      const fallbackTier = user?.planTier || user?.packageName || '';
      const nextTier = tierParamRaw || storedTier || fallbackTier || '';
      if (nextTier && nextTier !== tier) {
        setTier(nextTier);
        window.localStorage.setItem('dietAccessTier', nextTier);
      }
    }
  }, [dayParamRaw, dietParamRaw, tierParamRaw, user?.planTier, user?.packageName, selectedDay, dietType, tier]);

  const normalizedTier = tier.toLowerCase();
  const hasDietAccess = previewMode || tierWhitelist.some((keyword) => normalizedTier.includes(keyword));

  const currentPlan = useMemo(() => {
    return dietPlans[dietType]?.[selectedDay];
  }, [dietType, selectedDay]);

  const syncQuery = (day: number, type: DietType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('day', String(day));
    params.set('diet', type);
    if (tier) {
      params.set('tier', tier);
    }
    if (previewMode) {
      params.set('preview', '1');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    syncQuery(day, dietType);
  };

  const handleDietToggle = (type: DietType) => {
    setDietType(type);
    syncQuery(selectedDay, type);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="bg-white rounded-3xl shadow-lg border border-green-100 p-8 relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-br from-emerald-100/60 to-teal-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">HOMA Clinic • Diet Access</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Your 30-Day Metabolic Diet is Ready!</h1>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Structured 2,000-kcal Indian meals curated by Dr. Muddu. Toggle Veg/Non-Veg, pick your day, and follow the hydration +
                movement cues to stay in remission mode. Once unlocked, this plan syncs with your dashboard habits log.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">🎯 Remission Pro & above</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">🥗 Veg & Non-Veg rotation</span>
                <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full">📅 Day selector 1–30</span>
              </div>
            </div>
            <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-xl w-full lg:w-80">
              <p className="text-sm uppercase tracking-wider text-emerald-200">Next Step</p>
              <h3 className="text-xl font-semibold mt-2">Log today&apos;s diet on your dashboard</h3>
              <p className="text-emerald-100 text-sm mt-2">
                Keep your meals, hydration, and steps in sync so the clinical team can update your protocols.
              </p>
              <Link
                href="/dashboard"
                className="mt-4 inline-flex items-center justify-center w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 rounded-xl transition"
              >
                ↩ Back to Dashboard
              </Link>
            </div>
          </div>
          {previewMode && (
            <div className="relative z-10 mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
              Preview mode enabled — showing sample meals for demo purposes. Payment redirect will unlock full access automatically.
            </div>
          )}
        </section>

        {!authLoading && !isAuthenticated && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-gray-900 font-semibold">Log in to sync this plan with your assessments</p>
              <p className="text-sm text-gray-600">Diet progress is saved per user. Sign in before you start today&apos;s day.</p>
            </div>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-xl font-medium shadow-sm hover:bg-green-700 transition"
            >
              🔐 Go to Login
            </Link>
          </div>
        )}

        <section className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Choose your style</h2>
                {tier && (
                  <span className="text-xs uppercase tracking-wide text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {tier}
                  </span>
                )}
              </div>
              <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                <button
                  type="button"
                  onClick={() => handleDietToggle('veg')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${
                    dietType === 'veg' ? 'bg-white shadow text-green-700' : 'text-gray-500'
                  }`}
                >
                  🌿 Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => handleDietToggle('nonVeg')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${
                    dietType === 'nonVeg' ? 'bg-white shadow text-green-700' : 'text-gray-500'
                  }`}
                >
                  🍗 Non-Veg
                </button>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Day Selector (1–30)</p>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {dayOptions.map((day) => {
                    const isActive = day === selectedDay;
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleDaySelect(day)}
                        className={`py-2 rounded-xl text-sm font-semibold border transition ${
                          isActive
                            ? 'bg-green-600 text-white border-green-600 shadow'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
                        }`}
                      >
                        Day {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <div>
                  <p className="text-sm uppercase text-gray-500 tracking-wide">Metabolic intent</p>
                  <p className="text-lg font-semibold text-gray-900">Stabilize insulin • Protect mitochondria</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Front-load fiber & protein before starches.</li>
                <li>Hydrate before caffeine; limit caffeine after 2 pm.</li>
                <li>Minimum 7 hrs sleep + 10k steps on intensive days.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {hasDietAccess && currentPlan ? (
              <>
                <div className="bg-white rounded-3xl border border-green-100 shadow-md p-6 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Day {selectedDay} • {dietType === 'veg' ? 'Vegetarian' : 'Non-Veg'} plan</p>
                      <h2 className="text-2xl font-bold text-gray-900">{currentPlan.theme}</h2>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      ≈ 2,000 kcal
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Breakfast boost', value: currentPlan.breakfast, icon: '🌅', accent: 'from-orange-50 to-white' },
                      { label: 'Lunchtime fuel', value: currentPlan.lunch, icon: '🥗', accent: 'from-green-50 to-white' },
                      { label: 'Dinner wind-down', value: currentPlan.dinner, icon: '🌙', accent: 'from-blue-50 to-white' },
                      { label: 'Snack & sip', value: currentPlan.snacks, icon: '🍵', accent: 'from-amber-50 to-white' },
                    ].map((section) => (
                      <div
                        key={section.label}
                        className={`rounded-2xl border border-gray-100 bg-gradient-to-br ${section.accent} p-4 shadow-sm`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{section.icon}</span>
                          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{section.label}</p>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">{section.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-teal-100 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-teal-600">Hydration target</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.hydration}</p>
                    <p className="text-sm text-gray-600 mt-2">Include rock-salt electrolytes if you sweat {'>'} 30 min.</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-green-600">Movement cue</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.movement}</p>
                    <p className="text-sm text-gray-600 mt-2">Log steps & workouts inside your dashboard habits card.</p>
                  </div>
                  <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-amber-600">Doctor tip</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{currentPlan.tip}</p>
                    <p className="text-sm text-gray-600 mt-2">Share progress with Dr. Muddu every 7 days.</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-dashed border-green-200 p-10 text-center space-y-4 shadow-sm">
                <div className="text-5xl">🔒</div>
                <h2 className="text-2xl font-bold text-gray-900">Upgrade to unlock your 30-day diet plan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Diet plans are included with <strong>Remission Pro (₹29,999)</strong>, Lion Heart Palladium, and Gold Membership tiers.
                  Once your payment is confirmed, you&apos;ll be redirected here automatically (<code>/diet?day=1</code>) and access will stay unlocked for future visits.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/pricing"
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"
                  >
                    💎 See Premium Packages
                  </Link>
                  <a
                    href="https://wa.me/919963721999?text=I want to unlock the Remission Pro diet plan"
                    target="_blank"
                    className="px-6 py-3 border border-green-300 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition"
                  >
                    📞 Talk to Dr. Muddu
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {hasDietAccess && currentPlan && (
          <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm uppercase text-gray-500 tracking-wide">Daily checklist</p>
                <h3 className="text-2xl font-bold text-gray-900">Stay accountable for Day {selectedDay}</h3>
                <p className="text-gray-600 mt-1">
                  Mark these in your dashboard after meals so the care team can tweak macros before Day {selectedDay + 1 > 30 ? 30 : selectedDay + 1}.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow hover:bg-emerald-700 transition"
              >
                ✅ Log today&apos;s progress
              </Link>
            </div>
            <div className="mt-6 grid md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                <p className="font-semibold text-emerald-800">1. Fiber-first bite</p>
                <p className="text-emerald-700 mt-1">Eat raw salad / sprouts before main carbs.</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="font-semibold text-blue-800">2. Hydration pulses</p>
                <p className="text-blue-700 mt-1">Sip 250 ml water 20 min before each meal.</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="font-semibold text-amber-800">3. Walk after meals</p>
                <p className="text-amber-700 mt-1">Target 10–12 min light walk post lunch & dinner.</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                <p className="font-semibold text-purple-800">4. Night shutdown</p>
                <p className="text-purple-700 mt-1">Screens off 30 min before bed, deep breathing x5.</p>
              </div>
            </div>
          </section>
        )}

        <section className="text-center space-y-4 pb-6">
          <p className="text-sm uppercase tracking-wide text-gray-500">Need help sticking to the plan?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919963721999?text=I need help with my diet plan day"
              target="_blank"
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"
            >
              💬 WhatsApp the care team
            </a>
            <Link
              href="/remission-program"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              📘 Review the 90-Day Protocol
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

// Wrapper with Suspense for useSearchParams
export default function DietPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Diet Plan...</p>
        </div>
      </div>
    }>
      <DietContent />
    </Suspense>
  );
}
