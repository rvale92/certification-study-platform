# Certification cheat-sheet data

## App integration and publication

- Main page: `/cheatsheets`; default module: `/cheatsheets/aws-saa`.
- Existing certification ID: `aws-saa-c03`; `/cheatsheets/aws-saa-c03` is a supported alias to the canonical short route.
- The shared reader supports keyword search across explanations/tags/comparisons, domain filtering, section tabs, and per-card or bulk expansion. Material UI palette tokens provide light/dark styling; the header toggle persists the chosen mode locally.
- JNCIA, CCNA, Security+ SY0-701 and SC-200 are explicit coming-soon tracks, not incomplete AWS clones. To add one, create a module following `types.ts` and register it in `cheatSheetModules` in `index.ts`. Track availability is derived from the registry; no reader-component fork is required.
- `public/404.html` encodes Pages deep links and the restoration script in `public/index.html` reconstructs the URL before BrowserRouter starts, including ordinary query/hash data.
- `.github/workflows/deploy-pages.yml` verifies pushes to `main` and publishes the exact verified artifact to **`gh-pages`** without force-pushing. Pages remains configured for that branch. An explicit Pages-build API request handles the fact that pushes using `GITHUB_TOKEN` alone do not trigger a Pages build.
- The workflow requires repository variables `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` so a clean CI build preserves the existing tutor. These are browser-public configuration; never substitute a service-role or private provider key. Only the publish job receives repository `contents: write` / `pages: write` permissions; pull requests cannot publish.

## AWS SAA-C03

`src/data/cheatsheets/awsSaa.ts` exports the named `awsSaaCheatSheet: CheatSheetModule` using the shared contract in `./types`. This is data only: no routing, registry, UI, network requests, credentials, or runtime dependencies are introduced here. Other certification tracks are outside this dataset's scope; do not present this AWS content as their revision material.

Reviewed: **November 19, 2026**. Module ID: `aws-saa`; certification ID: `aws-saa-c03`; exam code: `SAA-C03`.

The module contains **68 cards**: **47 domain cards**, **8 scenario-comparison cards** (22 comparison options), **8 numerical/constraint cards**, and **5 strategy cards**. Every card has a plain-English explanation, analogy, at least two bullets, conditional exam tip, tags, and resolvable `sourceIds`. There are **94 linked AWS primary sources** in the source registry. Source IDs are local attribution keys, not claims that every service is supported in every account/Region.

### Blueprint and coverage

| Exam domain | Weight | Cards | Coverage |
| --- | ---: | ---: | --- |
| Design Secure Architectures | 30% | 12 | IAM users/groups/roles, STS, policies, SCPs, KMS/CloudHSM, Secrets Manager/Parameter Store, GuardDuty/Inspector/Macie, WAF/Shield, CloudTrail/Config/CloudWatch, VPC/subnets/routes/IGW/NAT, SG/NACL, endpoints/PrivateLink, S3 access/encryption |
| Design Resilient Architectures | 26% | 12 | Multi-AZ stateless design, Auto Scaling and health checks, RDS failover/read replicas, Aurora, SQS retries/DLQ/visibility/idempotency, SNS fanout, EventBridge, Step Functions, RTO/RPO, backup protection, S3 versioning/replication/Object Lock, hybrid connectivity |
| Design High-Performing Architectures | 24% | 15 | EC2 T/M/C/R/I/G, ALB/NLB/GWLB, ECS/EKS with Fargate/EC2, Lambda cold starts/concurrency, S3, EBS gp3/io2/st1/sc1, EFS/FSx, relational versus key-value design, DynamoDB indexes/DAX/Global Tables, ElastiCache, peering/Transit Gateway, Route 53, CloudFront/Global Accelerator, Athena/Glue/Redshift/Kinesis |
| Design Cost-Optimized Architectures | 20% | 8 | On-Demand/Savings Plans/Reserved Instances/Spot, right-sizing/scaling, S3 classes/lifecycle, storage cleanup/performance, NAT/endpoints/data transfer, database/analytics economics, Storage Gateway/DataSync/Snowball context, managed-service total-cost tradeoffs |

Weights describe scored exam content, not a guarantee about the mix of any practice session. See source `exam` for the official guide. A service may support multiple domains; placing its principal explanation in one domain does not imply that the exam confines it there.

### Decision cards

Stable comparison IDs:

- `security-groups-vs-nacls`: stateful workload allow lists versus stateless subnet allow/deny filtering.
- `database-availability`: Multi-AZ versus read replica versus multi-Region design.
- `vpc-endpoints`: S3/DynamoDB gateway endpoints versus interface endpoints/PrivateLink.
- `load-balancers`: ALB versus NLB versus GWLB.
- `storage-models`: S3 objects versus EFS shared files versus EBS block storage.
- `messaging-patterns`: SQS work queues versus SNS fanout versus Kinesis streaming/replay.
- `disaster-recovery`: backup/restore versus pilot light versus warm standby versus active/active.
- `hybrid-link-choice`: Direct Connect versus Site-to-Site VPN.

Each option includes a pick-when scenario and a limitation. Heuristics remain conditional: protocol, consistency, failure scope, RTO/RPO, security, compatibility, and cost override keyword matching.

### Current corrections and caveats

The authoritative URLs and labels are recorded once in the module's `sources` array; the IDs below locate the supporting references without maintaining a second URL list.

- **S3 size:** AWS advertises **50 TB**, with its object documentation describing the multipart-derived ceiling as approximately **53.7 TB / 48.8 TiB**. Multipart allows 10,000 parts of up to 5 GiB; a single PUT is still limited to 5 GB. **5 TB is explicitly labeled legacy**, not a current hard limit, and the sheet makes no claim that the exam expects the old figure. Sources: `s3-size`, `s3-multipart`, `s3-upload`.
- **SQS size:** the current maximum is **1,048,576 bytes / 1 MiB**; **256 KiB (often written 256 KB) is labeled legacy**. Retention (up to 14 days), visibility (up to 12 hours), long polling (up to 20 seconds), and FIFO deduplication (5-minute window) are separate concepts. FIFO send deduplication does not make external business side effects automatically exactly once. Sources: `sqs-quotas`, `sqs-visibility`, `sqs-fifo`, `long-poll`.
- **Lambda:** the default-mode timeout is **900 seconds / 15 minutes**, and maximum memory is **10,240 MB**. Current **Lambda Managed Instances** documentation permits **5,400 seconds / 90 minutes** for asynchronous and eligible event-source-mapping invocations; synchronous invocations and Amazon MQ/DocumentDB mappings remain limited to 15 minutes. The common 15-minute rule must not be stated as universal across current execution modes. Default account concurrency of 1,000 is adjustable; new accounts may start lower. Sources: `lambda-quotas`, `lambda-mode`.
- **SSE-C:** the April 2026 change disables SSE-C by default for new general purpose buckets and also affects existing buckets in accounts without SSE-C objects. Deliberate opt-in and documented Bahrain/UAE rollout exceptions matter. Historical key-custody comparisons are not a description of current bucket defaults. Sources: `s3-ssec`, `s3-encryption`.
- **Snowball Edge:** the documented new-customer cutoff is **November 7, 2025**. It appears as legacy offline/edge exam context, not an unconditional current purchase recommendation. The docs identify DataSync, Data Transfer Terminal, and partner alternatives. Sources: `snow`, `snow-history`.
- **RDS:** a Multi-AZ DB **instance** standby is nonreadable; a Multi-AZ DB **cluster** has readable standbys. Do not say that all Multi-AZ standbys cannot serve reads. Sources: `rds-az`, `rds-replica`.
- **DynamoDB:** Global Tables supports **MREC** and **MRSC** in supported configurations; only the MREC description is universally asynchronous within that mode. Index rules, 400 KB items, and the 10 GB LSI item-collection constraint are covered separately. Sources: `global-tables`, `indexes`, `ddb-quotas`, `lsi`.
- **gp3:** the included baseline is 3,000 IOPS / 125 MiB/s. Current documented configurable maxima are **80,000 IOPS / 2,000 MiB/s**, with size/IOPS ratios and lower Outposts maxima (16,000 / 1,000) plus instance limits. Avoid copying old maxima. Sources: `gp3`, `ebs`.
- **Networking/TLS:** /16–/28 sizing and the ordinary five reserved subnet addresses refer to **IPv4**, with BYOIP exceptions; do not generalize them to IPv6. CloudFront viewer ACM certificates belong in **us-east-1**; origin TLS requirements are separate. Sources: `vpc-cidr`, `subnet-cidr`, `cf-tls`.
- **Exam scoring:** **720 is a scaled passing score, not 72% correct**. Published format: 65 questions / 130 minutes, with 50 scored and 15 unidentified unscored items. The example pacing plan reserves review time, and no strategy promises a passing result. Sources: `exam`, `exam-overview`.

### Verification and maintenance

Focused command (from the repository root):

```sh
CI=true npm test -- --watchAll=false --runInBand --runTestsByPath src/data/cheatsheets/awsSaa.test.ts
```

The five tests validate metadata/weights/minimum coverage, unique IDs and complete card/source fields, required topic/comparison coverage, service-scoped numeric corrections, and current-versus-legacy caveats. TDD verification first observed failure for missing data, then three content assertion failures against an empty typed module. After implementation the four initial tests passed. A new gp3-current-maxima assertion was then observed failing before the current, platform-qualified figures were added.

Tests are **content regression checks**, not live fact verification: passing them does not prove AWS has not changed a quota or offering. During authoring, all 94 referenced AWS URLs were retrieved successfully. Some valid AWS documentation URLs redirect within their service documentation; HTTP success alone is not evidence that a paragraph supports a claim, so review the relevant page content during updates.

For updates:

1. Read the exact linked official pages; verify mode, deployment type, units, account/Region availability, and whether each value is hard, adjustable, a default, or a billing rule.
2. Write a failing invariant for the new requirement or correction before editing the data.
3. Update the card and its source mappings together. Keep IDs stable for consumers and keep source URLs in the registry rather than duplicating them in bullets.
4. Run the focused tests and TypeScript checking. Review source/coverage counts in this document if cards are added or removed.
5. Advance `lastReviewed` only after reviewing the linked content. Preserve explicit legacy context rather than silently presenting older facts as current limits.

This dataset is a revision aid, not an exhaustive AWS specification, official exam question bank, pricing quote, or promise of certification. Prices, adjustable quotas, availability, and recently introduced service modes require rechecking at the time of an actual architecture decision.
