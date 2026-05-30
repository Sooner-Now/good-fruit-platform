# Opportunities Page

`opportunities.html` is a production-ready static page for community-supported business growth inside Good Fruit.

## Files

- `opportunities.html`: Semantic page template.
- `assets/opportunities.js`: Mock opportunity data, filters, card rendering, and detail preview behavior.
- `assets/styles.css`: Opportunities-specific styles under the `Opportunities` section.

## Local Verification

Run:

```bash
node scripts/verify.mjs
```

## WordPress Porting Map

This static structure can become:

- `page-opportunities.php`: Page shell and section order.
- `template-parts/opportunity-card.php`: Card markup.
- `template-parts/trust-notice.php`: Honor-system notice.
- `assets/css/opportunities.css`: Styles currently grouped in `assets/styles.css`.
- `assets/js/opportunities.js`: Filter and interaction script.
- `functions.php`: Enqueue the Opportunities stylesheet/script only on this page.

## Future CMS Fields

The sample data in `assets/opportunities.js` is shaped for future custom fields:

- `title`
- `slug`
- `founder_name`
- `organization_name`
- `city`
- `neighborhood`
- `category`
- `summary`
- `full_story`
- `funding_goal`
- `amount_raised`
- `progress_percent`
- `support_types[]`
- `endorsements_count`
- `status`
- `partner_church_or_group`

## Trust Language

The full honor-system language appears in the main trust notice. The compact version appears near the footer:

“Agreements made through Opportunities are between participants. Good Fruit operates on an honor system, and dishonest or harmful conduct may lead to banning from the platform.”
