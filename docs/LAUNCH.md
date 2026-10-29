# Production launch record

Updated: 2026-10-29. Status: **live and verified** at https://www.bradydorsey.dev. Brady explicitly authorized deployment after reviewing the protected preview. M9 and release PR #11 are merged.

## Verified launch

The separate production project portfolio-v2 / prj_5R6dkwsBC6xJTUxsVbKJgazLZ9E7 serves both business domains in team fusion407s-projects. Main release 0321758073bf909f025c6018d46e7afaad465e75 deployed as READY production artifact dpl_5mVGTTY16d5EtWqLojji7NPzEHHa. The canonical www alias was verified against that artifact. Apex retains its HTTPS 308 redirect to www.

All 36 unit and 216 source browser tests passed before cutover. All 28 public production checks passed after cutover. Six public Lighthouse samples on home, projects and Swordbound scored Performance 98–100 and Accessibility/Best Practices/SEO 100. Production canonicals, social origins/PNGs, index/follow, robots, sitemap, security headers, redirects, 404s, navigation/contact and both games are verified. The separate protected preview stays non-indexable.

The owner-controlled private backup contains original settings, complete five-record DNS inventory, domain/registrar metadata, empty environment inventory, exact deployment identity and verified source history. A recovery alias was assigned to the old artifact and rendered successfully without a rebuild. The old project, artifact, source and build/runtime settings remain retained. See [PRODUCTION-RELEASE.md](PRODUCTION-RELEASE.md) for identities, evidence and exact managed DNS behavior; see [ROLLBACK.md](ROLLBACK.md) for recovery.

No manual DNS or nameserver changes occurred. Vercel automatically updated its system-managed apex ALIAS target during the domain move; the other four records, their TTLs, nameservers and registrar settings remain unchanged. The private pre-launch snapshot is preserved. Do not overwrite the working managed target with the old value as an improvised recovery.

## Remaining review limits

- Manual screen-reader, physical Android/iOS, actual Safari and native zoom remain unverified. Automated emulation and lab scores do not replace those checks.
- Core wording and existing conceptual media are the accepted content. Later copy refinements and new real media require their own verification/permissions.
- Resume remains explicitly deferred, with no placeholder/download added.
- Additional historical inbound asset URLs may still need owner confirmation; the five known legacy content routes are covered.
- No blanket media/content license is inferred from the public repository.

Keep the retained original site and private backup through the owner's review window. No deletion, paid plan, domain purchase/transfer or registration change is part of this release. Future application changes follow the normal tested Git/preview workflow; main is the new production branch.
