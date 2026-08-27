# Destination Page Playbook

This document records the requirements and decisions established while building Budapest, the first completed destination page. Use it as the working brief for every future destination page in this repository.

Last consolidated: 27 August 2026.

## 1. Working rules

- Think and research in English, but publish all user-facing website content in Spanish from Spain.
- Do not guess. Verify facts with current sources; ask the user when a material detail cannot be established.
- Prefer official, primary sources for entry rules, opening hours, tickets, transport, exchange rates and weather.
- Clearly distinguish confirmed booking information, estimates, historical context and live data.
- Do not commit or push changes unless the user explicitly requests it.
- Design for phones first. The page must remain useful at a width of 320 px.

## 2. Fixed trip context

These facts apply to the current Waynabox trip and should be reused across all candidate destinations unless the user changes them.

| Item | Confirmed value |
| --- | --- |
| Origin | Barcelona |
| Travellers | 3 friends |
| Dates | 11–14 September 2026 |
| Duration | 4 days and 3 nights |
| Product | Flight + Hotel |
| Experience | Surprise in Europe |
| Outbound condition | Flight departs before 12:00 |
| Return condition | Flight departs after 12:00 |
| Destination exclusions | None |
| Luggage | Standard included personal bag/backpack |
| Extras | No additional services purchased |
| Local mobility | Walking and public transport |
| Destination reveal | 48 hours before departure |

The airport, exact flight times and hotel remain unknown until Waynabox reveals the booking. Friday and Monday plans must therefore be conditional and must not require non-refundable advance tickets unless the timing is safe.

### Direct-flight uncertainty

Do not assume that this booking is direct. Waynabox's public page for “Sorpresa en Europa” currently contains conflicting wording: it mentions both direct flights and direct flights or a connection shorter than two hours. The booking confirmation and particular/pre-contractual conditions take precedence. Keep this uncertainty visible until the user's documents confirm it.

## 3. Required page structure

Every destination page should contain the following sections in roughly this order:

1. Destination hero with dates, group size, currency and confirmed trip facts.
2. Important date-specific warning when closures, holidays or local events materially change the plan.
3. Three selectable itineraries.
4. Practical information for Spanish travellers.
5. Live currency and weather tools, with useful fallbacks.
6. Ticket/pass comparison and recommendation.
7. Budget-friendly, well-rated places to eat.
8. Research status, review date and source links.
9. Photo credits.

## 4. Itinerary requirements

Create three genuinely different four-day itineraries for every destination. Changing only the order of the same stops is not sufficient.

Typical distinctions may include:

- Essential first visit: major landmarks and the destination's defining experience.
- History and culture: more context, museums or memory sites.
- Destination plus day trip: a nearby town or site when the schedule supports it.

Only one itinerary should be visible at a time. Use accessible tabs, support keyboard navigation and keep the selected route in the URL hash.

### Every scheduled stop must include

- A clear name.
- Why it is worth visiting, using two or more concise sentences when useful.
- Estimated visit duration.
- The opening and closing hours that apply on the actual 2026 travel date.
- Last admission or access limitations when relevant.
- Enough schedule margin to complete the visit before closing.
- Estimated adult price in local currency.
- The euro equivalent when the local currency is not EUR.
- An official source for hours and prices wherever available.
- A map button or embedded map using the precise venue.
- A warning when worship, protocol, weather, seasonal service or another condition can change access.

Do not present a visit as available merely because the building exists. Check the weekday, the exact date, holidays, exceptional closures and the time required to reach it.

### Friday and Monday

- Friday starts only after a conservative airport, transfer, check-in and luggage allowance.
- Monday must branch according to the unknown return time.
- Do not pre-purchase a Monday attraction until the flight schedule is known.
- Airport and hotel transfers must be recalculated after the booking reveal.

### Day trips

- Include a day trip in one or two itineraries only when it improves the plan.
- The destination must be no more than two hours away each way by public transport.
- State the exact mode, station, typical travel time, ticket coverage and any supplement.
- Leave enough delay margin to protect the rest of the day's itinerary.

## 5. Daily mobility summary

Every day card must show, before its timeline:

- An estimated walking-distance range in kilometres.
- Every planned transport mode, such as walking, metro, tram, bus or suburban train.
- Useful line identifiers when the route is stable and verified, for example M1, M2, bus 16 or H5.

Walking figures must be presented as rounded ranges, not false precision. Calculate the route between scheduled stops and add a reasonable allowance for movement inside markets, parks, monuments and large complexes.

Until the hotel and airport are known, explicitly exclude:

- Airport transfers.
- Hotel-to-first-stop and last-stop-to-hotel journeys.
- Restaurant detours when the restaurant is not fixed in the timeline.
- Optional wandering and shopping.

Recalculate all totals after Waynabox reveals the hotel and flights. Verify the final public-transport plan against the local operator's official journey planner shortly before travel.

## 6. Tickets, passes and budgets

### Mandatory 48-hour ticket-feasibility audit

Waynabox reveals the destination only 48 hours before departure. Every proposed attraction must therefore be checked not only for its opening hours and price, but also for whether three tickets can realistically be obtained after the reveal.

Classify ticketed stops before treating them as part of a route:

- **Green — viable:** walk-up admission is normal, the venue explicitly sells tickets on site, or live official inventory shows adequate availability close to the date.
- **Amber — uncertain:** a timed slot is required or advance purchase is recommended, but an official same-day channel or a reasonable chance of late availability exists. Keep it only with a named, geographically sensible fallback in the same time block.
- **Red — not viable as an anchor:** sales opened well before the reveal, the attraction is already sold out for the exact dates/group size, there is no official door sale or waiting list, or the only remaining option is an expensive/unverifiable intermediary. Keep the place only as an exterior view or contextual mention and schedule another visit instead.

For this audit:

- Check the official ticket inventory for the exact 2026 date and three people whenever the interface allows it.
- Record release schedules, mandatory booking, door-sale rules, waiting-list rules and refund/change conditions.
- Never assume that a ticket will reappear and never recommend an unofficial reseller as the solution.
- Do not ask the user to buy speculative non-refundable tickets for several candidate destinations before the reveal.
- Put the guaranteed or most realistic visit in the main timeline. Describe a scarce ticket as an optional upgrade only after three official places are confirmed.
- Keep route budgets free of red-status tickets. Show the extra cost separately when an amber visit is an optional upgrade.
- Preserve the original landmark as an exterior stop or short mention when it remains important for understanding the destination.
- Re-run the official availability check immediately after the destination is revealed and before changing the route.

The page should contain a visible, concise ticket-feasibility note naming the fragile attractions and their replacements. A generic warning such as “book early” is not enough.

For every destination:

- Compare individual tickets, transport passes, city cards and relevant attraction combinations.
- State exactly what each pass includes and excludes.
- Calculate the break-even point against the proposed itineraries.
- Recommend a product only if the itinerary actually recovers its cost or it provides a clearly stated practical advantage.
- Show all prices in local currency and EUR when applicable.
- Identify eligibility assumptions, especially EU/EEA versus non-EU prices, age discounts and required identity documents.
- Give per-person and three-person group totals where they improve planning.
- Show two clearly labelled budget figures for every itinerary:
  - **Necessary base spend:** the paid visits that sustain the route, the best-value public-transport option required by that route and any unavoidable paid entry formality such as a UK ETA. Exclude flight, hotel, tourist tax and airport-to-hotel transport.
  - **Realistic trip total:** a range that adds four days of food, small everyday expenses, variable transport fares and sensible optional upgrades. Its upper end should reflect the expensive optional visit that could materially change the trip.
- Show both figures per person and for the group of three. When the destination does not use EUR, show local currency and EUR and connect both to the live exchange-rate updater.
- Do not put a conditional Monday attraction in the necessary base spend. Include it only in the realistic upper range until the return flight leaves enough time.
- When a train fare, dynamic admission or hotel-issued transport card cannot be fixed before the reveal, use a transparent range or conditional scenario and identify exactly what must be checked on 9 September.
- State the transport product or pay-as-you-go strategy included in each base calculation. Do not silently count airport coverage merely because the same pass happens to provide it.
- Keep the existing food-only estimate visible as supporting context, but never present it as the complete trip total.

## 7. Money and payment nuances

When the destination does not use the euro, include:

- A live EUR/local-currency converter.
- A dated fallback rate if the live service fails.
- Guidance on where to obtain cash at a fair rate.
- A warning about airport/hotel exchange rates when supported by local official guidance.
- Advice to pay in the local currency and reject dynamic currency conversion (DCC).
- Whether cards are widely accepted, cash is still necessary, or specific venues are card-only.
- Any useful denomination or change-related advice.

Do not reduce the answer to “cards are accepted”. Look for destination-specific exceptions that could affect the itinerary.

## 8. Information specifically for Spanish travellers

Create a visible practical section scoped to Spanish citizens. It should cover:

- Whether a visa is required.
- Whether a valid DNI, passport or another document is needed.
- Document validity rules.
- Transit-country requirements when connections are possible.
- European Health Insurance Card coverage when applicable, plus its limits.
- Relevant payment customs.
- Tipping and mandatory or pre-added service charges.
- Public-transport validation rules and common fine risks.
- Other local practices that may surprise travellers from Spain.

If any traveller has a different nationality, request that information and verify their case separately.

Use the Spanish Ministry of Foreign Affairs, official EU portals, the destination country's authorities and official transport operators as primary sources.

## 9. Restaurants

Prefer well-rated, budget-conscious venues that fit naturally into the itineraries. For each restaurant include:

- Type of food and atmosphere.
- Why it is a useful choice rather than only a list of dishes.
- Representative dish prices in local currency and EUR.
- Opening hours on the relevant days.
- Whether booking is necessary.
- Any service charge already added to the bill.
- A map button and official menu or reservation link.
- A highlighted “Cerca de” note naming nearby itinerary stops.
- The route or moment of the day where it fits best.
- The exact branch/address when a restaurant has multiple locations.

Ratings are time-sensitive. Record their platform and review date, and never imply that a rating is permanent.

## 10. Weather

Show two clearly differentiated layers.

### Live forecast

- Fetch the exact travel dates automatically when they enter the provider's forecast horizon.
- Show a short condition summary, expected maximum, expected minimum and rain probability for each day.
- Explain when the dates are still outside the forecast horizon.
- Keep a useful fallback visible when the API is unavailable.

### Historical expectation

- Use the same calendar dates from a clearly stated recent historical period.
- Show an expected maximum and minimum for each travel day.
- Add a short overall interpretation, such as warm and mostly dry or more variable.
- Include an understandable rain-frequency measure.
- State the calculation period and methodology.
- Label this as historical context, never as a forecast.
- Mention the observed range when it helps communicate uncertainty.

The Budapest page uses the daily values for 11–14 September from 2016–2025 and defines a meaningful rain day as at least 1 mm of precipitation.

## 11. Maps and photography

- Every attraction and restaurant should have a map action.
- Use a modal map on the same page and provide an external Google Maps link for directions.
- Use precise venue names or addresses, especially for businesses with multiple branches.
- Add a small number of strong destination photos rather than decorative clutter.
- Optimise images for mobile loading.
- Write descriptive alt text.
- Credit the photographer, licence and source in `assets/images/CREDITS.md`.

## 12. Research and evidence rules

For every new destination:

1. Confirm country, currency, time zone and exact weekdays.
2. Check entry rules for Spanish citizens.
3. Check all opening hours against the exact travel dates.
4. Check official ticket prices and eligibility categories.
5. Check public-transport timetables, validation and airport connections.
6. Check local card/cash practices, tipping and service charges.
7. Check live and historical weather data.
8. Check restaurant addresses, hours, menus and service charges.
9. Check day-trip travel time using public transport, not straight-line distance.
10. Record the date on which volatile information was reviewed.

If official information is missing, conflicting or only available through an inaccessible interface:

- Say what is uncertain.
- Use a secondary source only when necessary and label the limitation.
- Ask the user when the answer could materially change the itinerary or cost.
- Do not silently resolve contradictions by choosing the most convenient claim.

## 13. Mobile-first and accessibility requirements

- Use a calm, low-saturation palette. Avoid neon or overly cheerful colours.
- Current visual direction: deep navy, warm sand, slate and off-white.
- Keep normal body text at a comfortable phone-reading size and line height.
- Use a highly legible system sans-serif for body text.
- Use a dedicated numeric stack with tabular figures for times, dates, prices and distances.
- Ensure the main navigation, including “Datos útiles”, remains visible at narrow widths.
- Stack complex grids on mobile.
- Keep route-selection controls sticky and concise.
- Maintain visible focus states and semantic tab roles.
- Respect `prefers-reduced-motion`.
- Do not force users to scroll through all three itineraries; show only the selected one.

## 14. Current technical pattern

- `css/trips.css`: shared palette, typography, layout and general components.
- `css/destination.css`: destination-specific itinerary, widget, restaurant, mobility and map components.
- `js/destination.js`: route tabs, live exchange rates, live weather and map dialog.
- `destinations/<slug>.html`: one standalone page per possible destination.
- Frankfurter/BCE: live currency reference without an API key.
- Open-Meteo: live forecast and historical weather data without an API key.
- Google Maps query embeds: location previews and external directions.

When CSS or JavaScript changes, increment the cache-busting query string in the HTML. Preserve graceful fallbacks when JavaScript or an external API fails.

Useful data conventions already established:

- `data-huf`: individual local-currency amount converted live to EUR.
- `data-huf-total`: route total converted live to EUR.
- `data-map`: precise map query.
- `data-label`: human-readable map title.

For another currency, generalise the currency-specific attributes and labels rather than copying HUF naming into the new page.

## 15. Budapest-specific facts

Do not copy these into another destination without fresh research:

- Currency: Hungarian forint (HUF).
- Spanish citizens do not need a visa for Hungary; valid DNI or passport is sufficient.
- The Great Synagogue is closed on 11, 12 and 13 September 2026.
- The current transport comparison favours a monthly Budapest pass plus 100E supplements under the route assumptions used on the page.
- The current day trip is Szentendre using suburban railway H5.
- Széchenyi's specified on-site entrance accepts bank-card payment only.
- Budapest paper single tickets require validation; mobile passes use QR/NFC checks in specified situations.
- The historical weather cards use Open-Meteo data from 2016–2025.
- Current walking ranges exclude the unknown hotel and airport journeys.

## 16. Definition of done for a new destination

A destination page is ready for review when:

- Three distinct routes work with tabs and URL hashes.
- Every stop explains why to visit, duration, exact-date hours, price and location.
- Every day shows walking kilometres and planned transport modes.
- At least one suitable day trip has been considered and either included or explicitly rejected.
- Pass/combo value is calculated against the routes.
- Restaurants include prices, hours, nearby attractions and route fit.
- Spanish entry and local-practice guidance is present.
- Live currency and weather widgets have fallbacks.
- Historical weather expectations appear for each day.
- Photos are optimised, accessible and credited.
- The 320 px layout remains readable and navigable.
- Volatile facts have a review date and official sources.
- Every paid or timed attraction has passed the 48-hour feasibility audit; red-status attractions are exterior/context only and amber ones have a concrete fallback.
- Unknowns and conditional plans are clearly labelled.
- `git diff --check` passes.
