import { CheatSheetModule } from './types';

// Reviewed against the linked AWS primary sources; sourceIds resolve in sources below.
// Keep current service behavior distinct from explicitly labeled legacy study context.
export const awsSaaCheatSheet: CheatSheetModule = {
  "id": "aws-saa",
  "certificationId": "aws-saa-c03",
  "title": "AWS SAA-C03 Architecture Cheat Sheet",
  "examCode": "SAA-C03",
  "description": "Plain-English service choices, architecture patterns, scenario comparisons, current limits, and exam strategy. Start with the requirement, then select the least-complex design that actually meets it.",
  "lastReviewed": "2026-11-19",
  "domains": [
    {
      "id": "secure-architectures",
      "title": "Design Secure Architectures",
      "weight": 30,
      "summary": "Control identity, protect data, segment networks, and detect or audit security events.",
      "cards": [
        {
          "id": "iam-identities",
          "title": "IAM users, groups, roles, and STS",
          "summary": "Control who can call AWS APIs and which actions they may perform.",
          "analogy": "Users are named badges; groups are teams; roles are temporary borrowed badges.",
          "bullets": [
            "Users are identities; groups collect users and attach permissions. Roles are assumed by people, applications, or AWS services and provide temporary credentials through STS.",
            "Prefer federation/IAM Identity Center for workforce access and roles for workloads, rather than distributing long-lived access keys.",
            "Use an EC2 instance profile or task execution/application roles as appropriate; never bake credentials into an AMI or container."
          ],
          "examTip": "An application on EC2 needs S3 access: choose an instance role with a narrowly scoped policy.",
          "tags": [
            "iam"
          ],
          "sourceIds": [
            "iam",
            "iam-practices"
          ]
        },
        {
          "id": "iam-policy-evaluation",
          "title": "Policies, least privilege, and account guardrails",
          "summary": "Policies describe permitted actions on resources, optionally under conditions.",
          "analogy": "A permission slip can open a door, but a building-wide prohibition still closes it.",
          "bullets": [
            "Implicit deny is the starting point. An applicable explicit deny overrides an allow; use action, resource, and condition restrictions.",
            "Identity policies attach to identities; resource policies attach to supported resources. Cross-account access must satisfy the relevant identity and resource/trust permissions.",
            "Organizations SCPs and permission boundaries limit maximum permissions; they do not grant access. Protect root with MFA and avoid routine root use."
          ],
          "examTip": "An SCP allowing an action does not make an otherwise unauthorized user able to do it.",
          "tags": [
            "iam"
          ],
          "sourceIds": [
            "iam-practices",
            "org"
          ]
        },
        {
          "id": "kms-hsm",
          "title": "KMS versus CloudHSM",
          "summary": "Encrypt data with controlled keys; choose how much key infrastructure you must operate.",
          "analogy": "KMS is a managed key desk; CloudHSM is a dedicated vault appliance you administer.",
          "bullets": [
            "KMS integrates with AWS services, key policies, IAM, and audit logging. Envelope encryption protects data keys rather than sending an entire database to KMS.",
            "CloudHSM supplies dedicated hardware security modules and more control over cryptographic applications, but you manage users, keys, capacity, and client integration.",
            "Encryption at rest is not authorization: callers still need the appropriate data-service and key permissions."
          ],
          "examTip": "Prefer KMS for integrated managed encryption; require dedicated HSM control before selecting CloudHSM.",
          "tags": [
            "kms"
          ],
          "sourceIds": [
            "kms",
            "hsm",
            "iam-practices",
            "kms-envelope"
          ]
        },
        {
          "id": "secrets-config",
          "title": "Secrets Manager versus Parameter Store",
          "summary": "Keep credentials and application configuration outside source code.",
          "analogy": "Secrets Manager is a rotating lock service; Parameter Store is a labeled configuration cabinet.",
          "bullets": [
            "Secrets Manager stores secrets and supports managed rotation for supported secrets or custom Lambda-based rotation.",
            "Parameter Store holds hierarchical configuration and SecureString secrets encrypted with KMS. Do not assume it automatically rotates database credentials.",
            "Restrict reads by role; retrieve secrets securely and cache appropriately rather than logging plaintext."
          ],
          "examTip": "Database passwords with automatic rotation usually point to Secrets Manager; ordinary configuration often fits Parameter Store.",
          "tags": [
            "secrets"
          ],
          "sourceIds": [
            "secrets",
            "parameter"
          ]
        },
        {
          "id": "detect-threats",
          "title": "GuardDuty, Inspector, and Macie",
          "summary": "Match the security tool to the question being asked.",
          "analogy": "GuardDuty is the suspicious-activity detective, Inspector the flaw inspector, Macie the sensitive-document scanner.",
          "bullets": [
            "GuardDuty analyzes supported telemetry for threats and suspicious behavior; it is not an application vulnerability scanner.",
            "Inspector identifies software vulnerabilities and exposure in supported EC2, container-image, and Lambda workloads.",
            "Macie discovers sensitive data and evaluates data security posture in S3; it is not a general-purpose scanner for every database."
          ],
          "examTip": "Suspicious API activity → GuardDuty; vulnerable package → Inspector; PII in S3 → Macie.",
          "tags": [
            "detect"
          ],
          "sourceIds": [
            "guard",
            "inspector",
            "macie"
          ]
        },
        {
          "id": "waf-shield",
          "title": "WAF and Shield",
          "summary": "Filter application requests and defend against distributed denial-of-service attacks.",
          "analogy": "WAF checks request contents at the entrance; Shield helps absorb a crowd trying to overwhelm the building.",
          "bullets": [
            "WAF web ACLs match supported HTTP(S) traffic using rules such as IP, rate-based, SQL injection, and cross-site scripting protections.",
            "Shield Standard provides baseline DDoS protection; Shield Advanced adds paid capabilities and support for eligible resources.",
            "Neither replaces authentication, secure code, or security groups. Attach WAF to a supported resource such as CloudFront or an ALB."
          ],
          "examTip": "An HTTP attack-pattern rule points to WAF; broad DDoS protection points to Shield.",
          "tags": [
            "waf"
          ],
          "sourceIds": [
            "waf"
          ]
        },
        {
          "id": "audit-config",
          "title": "CloudTrail, Config, and CloudWatch",
          "summary": "Separate API audit history, configuration history, and operational telemetry.",
          "analogy": "CloudTrail is the visitor log, Config the inventory/history book, CloudWatch the instrument panel.",
          "bullets": [
            "CloudTrail records supported account activity and API events. Enable the needed data-event logging rather than assuming every object access is logged by default.",
            "Config records supported resource configuration changes and evaluates compliance against rules; it is not an API audit replacement.",
            "CloudWatch collects metrics and logs and can alarm on operational conditions. Use centralized protected logging and appropriate retention."
          ],
          "examTip": "Who changed a security group? CloudTrail. Is it noncompliant and what changed? Config.",
          "tags": [
            "audit"
          ],
          "sourceIds": [
            "trail",
            "config",
            "cloudwatch"
          ]
        },
        {
          "id": "vpc-routing",
          "title": "VPC subnets, routes, and internet gateways",
          "summary": "Place resources in isolated networks and explicitly route their traffic.",
          "analogy": "The VPC is a campus, subnets are rooms, route tables are road signs, and the IGW is the public entrance.",
          "bullets": [
            "A subnet belongs to one Availability Zone; a VPC spans AZs in its Region. A public subnet has a route to an internet gateway.",
            "For direct IPv4 internet access, an instance also needs a public IPv4 address or Elastic IP plus allowed security and routing rules; the route alone is insufficient.",
            "Keep databases in private subnets; route selection uses the most specific matching route. Design nonoverlapping CIDRs for future connectivity."
          ],
          "examTip": "Public subnet does not mean every resource in it is automatically internet reachable.",
          "tags": [
            "vpc"
          ],
          "sourceIds": [
            "vpc",
            "vpc-cidr"
          ]
        },
        {
          "id": "nat-egress",
          "title": "NAT gateways and IPv6 egress",
          "summary": "Allow private workloads to initiate outbound connections without accepting unsolicited inbound internet traffic.",
          "analogy": "NAT is a receptionist who sends requests out and matches the replies.",
          "bullets": [
            "A public NAT gateway uses an Elastic IP and a route through an IGW; private subnet routes can direct outbound IPv4 traffic to it.",
            "For the standard zonal NAT pattern, place a NAT gateway in each used AZ and route each private subnet to its local one to avoid a single-AZ dependency and cross-AZ traffic.",
            "An egress-only internet gateway is the IPv6 outbound-only pattern. A NAT gateway is not an inbound port-forwarding service."
          ],
          "examTip": "Use service endpoints instead of NAT for supported AWS service traffic when requirements fit.",
          "tags": [
            "nat"
          ],
          "sourceIds": [
            "nat",
            "vpc",
            "endpoints"
          ]
        },
        {
          "id": "network-filters",
          "title": "Security groups and NACLs",
          "summary": "Apply network rules at the workload interface and subnet boundaries.",
          "analogy": "A security group is a room guest list; a NACL is a checkpoint at the neighborhood boundary.",
          "bullets": [
            "Security groups are stateful allow lists: allowed connection response traffic is automatically permitted; rules attach to supported network interfaces/resources.",
            "NACLs are stateless subnet filters with allow and deny rules evaluated in number order, first matching rule wins.",
            "For NACLs, account for both directions including ephemeral response ports; opening inbound application ports alone may not work."
          ],
          "examTip": "Need an explicit subnet-wide deny? NACL. Need workload-to-workload allowed access? Security groups.",
          "tags": [
            "network"
          ],
          "sourceIds": [
            "sg",
            "nacl"
          ]
        },
        {
          "id": "private-service-access",
          "title": "Gateway endpoints and PrivateLink",
          "summary": "Reach supported services privately without sending that traffic through a NAT gateway.",
          "analogy": "A gateway endpoint is a private road sign; an interface endpoint is a private service doorway with a network address.",
          "bullets": [
            "Gateway endpoints support S3 and DynamoDB through route tables; they are not general endpoints for all AWS services.",
            "Interface endpoints use private IPs on endpoint ENIs and security groups, powered by AWS PrivateLink. Configure DNS, network reachability, and policies.",
            "Endpoint policies restrict permitted access but do not grant otherwise missing IAM permissions. PrivateLink also exposes supported producer services without full VPC peering."
          ],
          "examTip": "S3 from a VPC without NAT often fits a gateway endpoint; an on-premises or other-service requirement may need an interface endpoint.",
          "tags": [
            "private"
          ],
          "sourceIds": [
            "endpoints",
            "privatelink"
          ]
        },
        {
          "id": "s3-access-encryption",
          "title": "S3 access and encryption",
          "summary": "Keep object data private and select key ownership deliberately.",
          "analogy": "A bucket has both a door policy and a lock; a lock does not decide who may enter.",
          "bullets": [
            "Use Block Public Access, least-privilege bucket/IAM policies, and appropriate private-origin access for CloudFront. Presigned URLs grant time-limited delegated access.",
            "SSE-S3 is the default base encryption for new uploads; SSE-KMS adds KMS key control and permissions with KMS request/cost considerations. TLS protects data in transit.",
            "SSE-C means the client supplies the key on each applicable request. Since April 2026 new general purpose buckets disable SSE-C by default; enable it deliberately if required. The FAQ notes Bahrain/UAE rollout exceptions and effects on existing accounts."
          ],
          "examTip": "Legacy SSE-C comparisons describe key custody, not current bucket defaults. Do not treat encryption as a substitute for access control.",
          "tags": [
            "s3"
          ],
          "sourceIds": [
            "s3-access",
            "s3-encryption",
            "s3-ssec",
            "cf",
            "s3-presign"
          ]
        }
      ]
    },
    {
      "id": "resilient-architectures",
      "title": "Design Resilient Architectures",
      "weight": 26,
      "summary": "Isolate failures, decouple work, preserve recovery copies, and match recovery designs to business targets.",
      "cards": [
        {
          "id": "multi-az-design",
          "title": "Fault isolation and stateless multi-AZ tiers",
          "summary": "Keep an application available when an instance or an Availability Zone fails.",
          "analogy": "Several checkout lanes keep the shop open when one lane closes.",
          "bullets": [
            "Spread instances/tasks across AZs behind a load balancer; use health checks and Auto Scaling to replace unhealthy capacity.",
            "Keep sessions and shared state in a suitable external store rather than on one instance. Confirm every dependency, including egress and database, has an appropriate failure path.",
            "Multi-AZ helps with AZ failures; it does not by itself protect against a Regional outage or accidental data deletion."
          ],
          "examTip": "Trace the whole request path: a multi-AZ web tier with a single-AZ database still has a single-AZ dependency.",
          "tags": [
            "multi"
          ],
          "sourceIds": [
            "asg",
            "elb",
            "dr"
          ]
        },
        {
          "id": "auto-scaling",
          "title": "Auto Scaling and health-based recovery",
          "summary": "Maintain capacity and adapt an EC2 fleet to demand.",
          "analogy": "A store manager opens or replaces checkout lanes as queues change.",
          "bullets": [
            "An Auto Scaling group defines minimum, desired, and maximum capacity and can distribute instances across configured AZs.",
            "Use target tracking for a suitable metric, scheduled scaling for predictable patterns, and lifecycle hooks/warmup where initialization needs coordination.",
            "Configure the relevant load balancer health checks and deregistration behavior; scaling is not instantaneous and must respect downstream limits."
          ],
          "examTip": "CPU alone may miss queue or request pressure; select a metric proportional to per-instance load.",
          "tags": [
            "auto"
          ],
          "sourceIds": [
            "asg",
            "elb"
          ]
        },
        {
          "id": "rds-availability",
          "title": "RDS Multi-AZ and read replicas",
          "summary": "Choose database failover separately from read scaling.",
          "analogy": "A standby is a backup driver; a read replica is another desk serving readers.",
          "bullets": [
            "A Multi-AZ DB instance deployment synchronously maintains a standby for failover; that standby does not serve reads.",
            "Multi-AZ DB cluster deployments have two readable standbys: do not generalize the nonreadable-standby rule to all RDS deployments.",
            "Read replicas generally replicate asynchronously for read scaling and can support DR with promotion. Replication lag and application reconnection still matter."
          ],
          "examTip": "If the requirement is HA without changing read routing, Multi-AZ is often the fit; extra reads are a separate requirement.",
          "tags": [
            "rds"
          ],
          "sourceIds": [
            "rds-az",
            "rds-replica"
          ]
        },
        {
          "id": "aurora-resilience",
          "title": "Aurora clusters and recovery",
          "summary": "Use a managed relational cluster with distributed storage and replica-based failover.",
          "analogy": "Several database desks share a durable managed filing system.",
          "bullets": [
            "Aurora offers MySQL- or PostgreSQL-compatible engines, a writer endpoint, and reader endpoints for replicas.",
            "Place replicas across AZs for compute failover, and separate read traffic appropriately; durable storage alone does not provide ready reader compute.",
            "Aurora Global Database is a cross-Region option; distinguish planned switchover from outage failover and evaluate lag/data-loss risk and cost."
          ],
          "examTip": "Aurora replicas are not separate full storage copies in the same way as ordinary RDS read replicas.",
          "tags": [
            "aurora"
          ],
          "sourceIds": [
            "aurora",
            "aurora-global"
          ]
        },
        {
          "id": "sqs-decouple",
          "title": "SQS buffering, retries, and dead-letter queues",
          "summary": "Decouple workers from producers so bursts and temporary failures do not drop work.",
          "analogy": "A durable order tray lets cooks work independently from the cashier.",
          "bullets": [
            "Standard queues provide at-least-once delivery and best-effort ordering. Consumers must be idempotent because a message can be delivered again.",
            "Visibility timeout temporarily hides a received message; delete it only after successful work. Extend visibility for longer work and use a DLQ after an appropriate retry count.",
            "FIFO provides ordering per message group and send deduplication, not an automatic exactly-once business transaction. Process distinct groups concurrently where appropriate."
          ],
          "examTip": "Backlog grows during worker failure: recover workers and drain the queue, not replace the queue with synchronous coupling.",
          "tags": [
            "sqs"
          ],
          "sourceIds": [
            "sqs",
            "sqs-visibility",
            "sqs-fifo"
          ]
        },
        {
          "id": "sns-fanout",
          "title": "SNS publish/subscribe fanout",
          "summary": "Deliver an event to multiple independent subscribers.",
          "analogy": "A public announcement sends the same news to many listeners.",
          "bullets": [
            "SNS publishes to topics and pushes deliveries to supported subscribers; subscription filters can route only relevant messages.",
            "Fanout to separate SQS queues lets billing, shipping, and analytics each retain and retry their own copy.",
            "A single shared SQS queue load-balances work among consumers; it does not give every consumer a copy."
          ],
          "examTip": "One event, several independently retried downstream systems: SNS to an SQS queue per consumer is a common pattern.",
          "tags": [
            "sns"
          ],
          "sourceIds": [
            "sns",
            "sqs"
          ]
        },
        {
          "id": "eventbridge-routing",
          "title": "EventBridge event routing",
          "summary": "Route application, AWS service, and SaaS events using event patterns.",
          "analogy": "A mail sorter sends each envelope to interested departments based on its contents.",
          "bullets": [
            "Event buses and rules route matching events to supported targets; use filtering and transformation instead of hard-wiring every producer to every consumer.",
            "Configure retry policies and dead-letter queues for supported targets; design idempotent consumers and account for delivery failures.",
            "Use archive/replay when requirements fit; an event bus is not a substitute for an indefinitely replayable ordered stream."
          ],
          "examTip": "Rich event-content routing and AWS/SaaS integration often point to EventBridge rather than a simple broadcast topic.",
          "tags": [
            "eventbridge"
          ],
          "sourceIds": [
            "events"
          ]
        },
        {
          "id": "step-functions-workflows",
          "title": "Step Functions orchestration",
          "summary": "Coordinate multi-step work, choices, retries, and parallel branches.",
          "analogy": "A workflow conductor tells each musician when to play and handles missed cues.",
          "bullets": [
            "State machines orchestrate supported AWS service calls and tasks; define retry/backoff, catch paths, timeouts, and compensation where needed.",
            "Standard and Express workflows have different execution and billing semantics; select based on duration, volume, and integration requirements.",
            "External side effects still need idempotency and sometimes compensating transactions; orchestration does not magically roll back every service."
          ],
          "examTip": "A chain of business steps with waits and retries is orchestration, not merely a queue.",
          "tags": [
            "step"
          ],
          "sourceIds": [
            "step"
          ]
        },
        {
          "id": "rto-rpo",
          "title": "RTO and RPO: define recovery targets",
          "summary": "Choose recovery architecture from acceptable downtime and acceptable lost data.",
          "analogy": "RTO is how soon the shop reopens; RPO is how much of the receipt book you can lose.",
          "bullets": [
            "RTO is the target recovery time; RPO is the target data-loss window measured backward from the incident.",
            "Backups, asynchronous replicas, and active/active architectures offer different cost, operational complexity, and recovery tradeoffs; no fixed time is guaranteed by the pattern name.",
            "Test detection, data restoration, secrets, networking, DNS, and failback. A backup that has not been restored in a drill is an unverified recovery plan."
          ],
          "examTip": "A tiny RPO needs an appropriate replication strategy; a tiny RTO also needs ready capacity and an exercised cutover.",
          "tags": [
            "rto"
          ],
          "sourceIds": [
            "dr",
            "backup"
          ]
        },
        {
          "id": "backup-protection",
          "title": "AWS Backup, snapshots, and deletion protection",
          "summary": "Protect recoverable copies separately from the running production system.",
          "analogy": "An off-site copy survives mistakes that damage the original filing cabinet.",
          "bullets": [
            "AWS Backup centralizes supported backup policies, retention, monitoring, and recovery workflows; confirm resource and Region support.",
            "Use appropriate cross-account/Region copies and vault protections such as Vault Lock where required; IAM separation reduces blast radius.",
            "Replicas and Multi-AZ are not independent backups: bad writes and deletions can propagate. Validate point-in-time recovery and restore procedures."
          ],
          "examTip": "Ransomware or accidental deletion calls for protected recovery copies, not only a standby database.",
          "tags": [
            "backup"
          ],
          "sourceIds": [
            "backup",
            "dr",
            "backup-vault"
          ]
        },
        {
          "id": "s3-durability-recovery",
          "title": "S3 versioning, replication, and object protection",
          "summary": "Recover older objects and copy data across buckets or Regions deliberately.",
          "analogy": "Versioning keeps earlier drafts; replication sends selected drafts to another library.",
          "bullets": [
            "Versioning retains object versions; normal deletion in a versioned bucket typically creates a delete marker. Permanent version deletion is a different action.",
            "S3 replication requires versioning on the participating buckets and appropriate permissions. Replication rules and existing-object handling must be explicitly planned.",
            "Object Lock supplies WORM retention for supported buckets. Replication is not a substitute for protected versions or separately controlled backups."
          ],
          "examTip": "A cross-Region copy alone does not guarantee zero RPO or protect against every deletion scenario.",
          "tags": [
            "s3"
          ],
          "sourceIds": [
            "s3-versioning",
            "s3-replication",
            "s3-access",
            "s3-lock"
          ]
        },
        {
          "id": "hybrid-connectivity",
          "title": "Direct Connect and Site-to-Site VPN",
          "summary": "Connect networks with dedicated links or encrypted internet tunnels.",
          "analogy": "Direct Connect is a reserved road; VPN is an armored tunnel over public roads.",
          "bullets": [
            "Direct Connect provides dedicated connectivity and more consistent networking; a private circuit does not automatically encrypt all traffic.",
            "Site-to-Site VPN uses IPsec tunnels and can be faster to provision. Design routing and redundant paths; do not confuse it with per-user Client VPN.",
            "For encryption over Direct Connect, choose supported MACsec or a suitable VPN design as requirements dictate; add independent links or VPN backup for resilience."
          ],
          "examTip": "Predictable sustained connectivity → consider Direct Connect; rapid encrypted connectivity → consider VPN. Never assume either is inherently failure-proof.",
          "tags": [
            "hybrid"
          ],
          "sourceIds": [
            "dx",
            "vpn",
            "dx-encryption"
          ]
        }
      ]
    },
    {
      "id": "high-performing-architectures",
      "title": "Design High-Performing Architectures",
      "weight": 24,
      "summary": "Choose compute, network, storage, database, and analytics patterns from workload behavior.",
      "cards": [
        {
          "id": "ec2-families",
          "title": "EC2 families: T, M, C, R, I, and G",
          "summary": "Match instance resources to the workload rather than guessing from size alone.",
          "analogy": "Pick a vehicle: commuter, delivery van, race car, moving truck, storage truck, or graphics workstation.",
          "bullets": [
            "T = burstable CPU with credits; M = balanced general purpose; C = compute optimized; R = memory optimized.",
            "I = storage optimized for local high-I/O needs; G = GPU/accelerated graphics and supported compute workloads. Instance-store data is ephemeral, not a durable database backup.",
            "Family, generation, architecture, network limits, and EBS limits all matter. Sustained CPU on T can exhaust credits or incur Unlimited surplus-credit charges."
          ],
          "examTip": "Choose C for CPU-bound work, R for a large memory working set, and suitable I families for low-latency local storage only when durability is handled elsewhere.",
          "tags": [
            "ec2"
          ],
          "sourceIds": [
            "ec2",
            "purchase",
            "ec2-burst"
          ]
        },
        {
          "id": "load-balancing",
          "title": "ALB, NLB, and GWLB",
          "summary": "Distribute traffic using the right network layer and integration.",
          "analogy": "ALB reads the address on a package; NLB forwards a connection; GWLB routes traffic through inspection appliances.",
          "bullets": [
            "ALB handles HTTP(S) layer-7 routing, including host/path rules and application integrations.",
            "NLB handles layer-4 TCP/UDP/TLS use cases, high-throughput connections, and static IP requirements. Application-aware routing is not its role.",
            "GWLB supports transparent network appliance fleets; it is not a normal website path router. All require suitable target health and routing."
          ],
          "examTip": "A URL-path rule → ALB; static network entry IPs or UDP → evaluate NLB; a firewall appliance fleet → GWLB.",
          "tags": [
            "load"
          ],
          "sourceIds": [
            "elb"
          ]
        },
        {
          "id": "containers",
          "title": "ECS, EKS, Fargate, and EC2 capacity",
          "summary": "Separate container orchestration from the servers on which containers run.",
          "analogy": "ECS/EKS schedule the shifts; Fargate or EC2 provides the workplace.",
          "bullets": [
            "ECS is AWS-native orchestration; EKS provides managed Kubernetes control planes for Kubernetes workloads.",
            "Fargate runs supported tasks/pods without managing worker servers; EC2 capacity offers more host control but more patching, scaling, and placement work.",
            "Check workload compatibility, networking, storage, privileged/daemon requirements, and deployment constraints before assuming Fargate fits."
          ],
          "examTip": "Existing Kubernetes APIs/tooling → EKS; no Kubernetes requirement and simpler AWS integration → consider ECS. Neither choice automatically requires Fargate.",
          "tags": [
            "containers"
          ],
          "sourceIds": [
            "ecs",
            "eks"
          ]
        },
        {
          "id": "lambda-execution",
          "title": "Lambda execution, cold starts, and concurrency",
          "summary": "Run event-driven code while managing initialization time and parallelism.",
          "analogy": "Lambda opens a small workbench for each unit of work; a cold workbench needs setup first.",
          "bullets": [
            "A cold start initializes an execution environment. Reduce unnecessary initialization and dependencies; provisioned concurrency preinitializes environments for supported low-latency use cases.",
            "Reserved concurrency reserves and caps a function share; it does not prewarm environments. Provisioned concurrency addresses readiness, not unlimited downstream capacity.",
            "Default-mode timeout is 900 seconds (15 minutes), and maximum memory is 10,240 MB. Current Managed Instances has a mode-specific longer timeout exception; see the limits card."
          ],
          "examTip": "A long-running workflow may need Step Functions, containers, or another execution model; increasing Lambda concurrency can overload a database.",
          "tags": [
            "lambda"
          ],
          "sourceIds": [
            "lambda",
            "lambda-quotas"
          ]
        },
        {
          "id": "s3-objects",
          "title": "S3 object storage and throughput patterns",
          "summary": "Store objects accessed by key, not a mounted block device or a traditional POSIX filesystem.",
          "analogy": "S3 is a warehouse of individually labeled parcels.",
          "bullets": [
            "Use multipart upload for large objects and retry parts independently. Current size limits differ from older 5 TB summaries; see the dedicated limits card.",
            "S3 provides strong read-after-write consistency for object operations, but applications still need to coordinate multi-object business transactions.",
            "Use CloudFront for appropriate global cached delivery; S3 Transfer Acceleration can help suitable long-distance uploads after testing."
          ],
          "examTip": "A web asset/object archive fits S3; an application requiring in-place filesystem writes may need EFS, EBS, or FSx.",
          "tags": [
            "s3"
          ],
          "sourceIds": [
            "s3-size",
            "s3-upload",
            "s3-classes",
            "cf",
            "s3-consistency"
          ]
        },
        {
          "id": "ebs-volumes",
          "title": "EBS gp3, io2, st1, and sc1",
          "summary": "Attach durable block volumes to EC2 within an Availability Zone.",
          "analogy": "EBS is a disk assigned to a machine, not a global shared folder.",
          "bullets": [
            "gp3 SSD suits general workloads and separates configurable performance from capacity. io2 suits demanding provisioned-IOPS, latency-sensitive databases where supported.",
            "st1 throughput-optimized HDD fits large sequential frequently accessed data; sc1 cold HDD fits infrequent sequential access. HDD types are not boot volumes.",
            "EBS volumes are AZ-scoped; snapshots support restore into another AZ. Instance limits and volume limits both constrain performance; Multi-Attach is a specific supported configuration, not default shared-file access."
          ],
          "examTip": "Random transactional I/O → SSD; large sequential low-cost data → consider HDD. Do not propose st1/sc1 as a root disk.",
          "tags": [
            "ebs"
          ],
          "sourceIds": [
            "ebs",
            "gp3"
          ]
        },
        {
          "id": "efs-fsx",
          "title": "EFS and FSx shared filesystems",
          "summary": "Choose shared file semantics and protocols instead of treating all storage as interchangeable.",
          "analogy": "EFS is a shared Linux filing room; FSx is a set of specialized filing systems.",
          "bullets": [
            "EFS supplies managed NFS file storage for compatible clients, including shared access across instances. Regional and One Zone deployment choices have different resilience.",
            "FSx for Windows File Server supports Windows/SMB integration; FSx for Lustre fits high-performance parallel workloads such as HPC processing with S3 integration.",
            "FSx also includes NetApp ONTAP and OpenZFS options. Choose protocol, availability, throughput, and integration requirements before choosing a brand."
          ],
          "examTip": "Shared Linux web content → EFS; native Windows SMB/AD needs → FSx for Windows; parallel HPC → evaluate Lustre.",
          "tags": [
            "efs"
          ],
          "sourceIds": [
            "efs",
            "fsx"
          ]
        },
        {
          "id": "database-choice",
          "title": "RDS, Aurora, and DynamoDB access patterns",
          "summary": "Choose a data model and access pattern before choosing a database service.",
          "analogy": "A relational ledger answers joins; a key-value catalog retrieves predictable entries fast.",
          "bullets": [
            "RDS/Aurora suit relational schemas, joins, and SQL transactions; use the engine and scaling options that fit the application.",
            "DynamoDB is managed key-value/document storage. Design partition/sort keys and access patterns to avoid hot partitions and broad scans.",
            "DynamoDB on-demand and provisioned capacity have different operational/cost behavior. It is not a drop-in relational SQL replacement."
          ],
          "examTip": "Known key lookups at variable scale often fit DynamoDB; complex relational querying usually points elsewhere.",
          "tags": [
            "database"
          ],
          "sourceIds": [
            "ddb",
            "aurora",
            "rds-replica"
          ]
        },
        {
          "id": "ddb-indexes",
          "title": "DynamoDB GSI, LSI, and DAX",
          "summary": "Add alternative queries and read acceleration with explicit consistency tradeoffs.",
          "analogy": "Indexes are alternate catalog cards; DAX is a fast photocopy desk.",
          "bullets": [
            "A GSI can use different partition and sort keys, can be added later, and supports eventually consistent reads; manage its capacity and projections.",
            "An LSI shares the table partition key and changes the sort key, is created with the table, and supports strong or eventual reads. LSI item-collection limits affect design.",
            "DAX caches compatible DynamoDB reads for microsecond-scale cache access; it is not a relational cache or a way to make eventually consistent data strongly consistent."
          ],
          "examTip": "New query using a different partition key → GSI. A strong-read alternative sort order under the same partition key → consider an LSI planned at table creation.",
          "tags": [
            "ddb"
          ],
          "sourceIds": [
            "indexes",
            "dax",
            "ddb-quotas"
          ]
        },
        {
          "id": "ddb-global",
          "title": "DynamoDB Global Tables: MREC and MRSC",
          "summary": "Replicate DynamoDB across supported Regions using a selected consistency mode.",
          "analogy": "Regional shop counters share a catalog, but the update agreement depends on the chosen mode.",
          "bullets": [
            "Multi-Region eventual consistency (MREC) is the default and replicates asynchronously; concurrent writes need the service conflict-resolution model.",
            "Multi-Region strong consistency (MRSC) is an available mode in supported configurations and Region sets. Its writes and reads have different latency/availability tradeoffs.",
            "Choose the consistency mode deliberately at creation and verify supported topology/features; do not claim that every Global Table is always asynchronous."
          ],
          "examTip": "A legacy question describing eventual cross-Region replication describes MREC, not the whole current Global Tables product.",
          "tags": [
            "ddb"
          ],
          "sourceIds": [
            "global-tables"
          ]
        },
        {
          "id": "elasticache",
          "title": "ElastiCache Redis OSS/Valkey versus Memcached",
          "summary": "Offload suitable repeated reads and maintain appropriate ephemeral fast-access data.",
          "analogy": "A cache is a fast countertop copy, not automatically the authoritative filing cabinet.",
          "bullets": [
            "Redis OSS/Valkey support rich data structures and replication/failover capabilities for suitable cache designs.",
            "Memcached is a simpler in-memory key-value cache suited to straightforward distributed caching; do not give it Redis persistence or replication semantics.",
            "Plan TTLs, invalidation, cache misses, and stampede protection. Cache-aside can serve stale data and does not remove the need for a durable source."
          ],
          "examTip": "Sessions, leaderboards, or data structures → evaluate Redis-compatible engines; simple disposable object caching → Memcached may fit.",
          "tags": [
            "elasticache"
          ],
          "sourceIds": [
            "cache"
          ]
        },
        {
          "id": "network-topology",
          "title": "VPC peering and Transit Gateway",
          "summary": "Connect networks without assuming that all routes are automatically transitive.",
          "analogy": "Peering is a direct bridge between two campuses; Transit Gateway is a central transport hub.",
          "bullets": [
            "VPC peering connects a pair of compatible networks; overlapping CIDRs are not supported and peering does not provide transitive routing.",
            "Transit Gateway centralizes supported VPC and on-premises connectivity and routing domains, reducing large mesh complexity.",
            "Configure routes, segmentation, DNS, and security in both directions. PrivateLink exposes services rather than providing general-purpose network transit."
          ],
          "examTip": "Many VPCs and on-premises hub-and-spoke connectivity → consider Transit Gateway; a simple pair may fit peering.",
          "tags": [
            "network"
          ],
          "sourceIds": [
            "peering",
            "tgw",
            "privatelink"
          ]
        },
        {
          "id": "route53-routing",
          "title": "Route 53 routing policies",
          "summary": "Select DNS answers based on application routing requirements.",
          "analogy": "DNS is the directory clerk telling callers which office to visit.",
          "bullets": [
            "Simple returns configured records; weighted splits responses by assigned weights; latency routes toward a low-latency Region; failover uses primary/secondary health.",
            "Geolocation follows user location; geoproximity considers resource/user location with bias; multivalue answers can return multiple healthy records.",
            "Health checks and alias target-health behavior depend on record/resource configuration. DNS caching and TTLs mean failover is not instantaneous."
          ],
          "examTip": "Canary traffic split → weighted; primary/DR → failover; lowest measured network latency → latency, not necessarily geographic proximity.",
          "tags": [
            "route53"
          ],
          "sourceIds": [
            "r53"
          ]
        },
        {
          "id": "global-edge",
          "title": "CloudFront versus Global Accelerator",
          "summary": "Improve global delivery with caching or network-path optimization.",
          "analogy": "CloudFront puts copies in neighborhood shops; Global Accelerator improves the road to the live shop.",
          "bullets": [
            "CloudFront is a CDN for cached and dynamic HTTP(S) delivery, reducing origin load where caching fits; use suitable cache keys, TTLs, and origin protection.",
            "Global Accelerator supplies static anycast IP addresses and routes supported TCP/UDP traffic over the AWS network to healthy endpoints; it is not a content cache.",
            "For CloudFront viewer HTTPS with an ACM certificate, request/import it in us-east-1. Origin HTTPS certificate requirements are separate."
          ],
          "examTip": "Static global IPs for a non-HTTP application → evaluate Global Accelerator; globally cached website content → CloudFront.",
          "tags": [
            "global"
          ],
          "sourceIds": [
            "cf",
            "ga",
            "cf-tls"
          ]
        },
        {
          "id": "analytics",
          "title": "Athena, Glue, Redshift, and Kinesis",
          "summary": "Separate SQL-on-objects, data integration, warehousing, and streaming.",
          "analogy": "Athena asks the lake questions; Glue catalogs/prepares it; Redshift organizes a warehouse; Kinesis carries a live conveyor belt.",
          "bullets": [
            "Athena runs serverless SQL over supported data, commonly S3. Partitioning and columnar formats can reduce scanned bytes; Glue Data Catalog supplies reusable metadata.",
            "Glue provides data integration, ETL, crawlers, and a catalog. Redshift is a managed analytical warehouse with provisioned/serverless options, not an OLTP replacement.",
            "Kinesis Data Streams ingests ordered-per-shard streaming records for replay and multiple consumers within configured retention. Consumers track progress; records are not deleted after one read."
          ],
          "examTip": "Ad hoc SQL on S3 → Athena; curated BI analytics → Redshift; ongoing replayable event ingestion → Kinesis.",
          "tags": [
            "analytics"
          ],
          "sourceIds": [
            "athena",
            "glue",
            "redshift",
            "kinesis"
          ]
        }
      ]
    },
    {
      "id": "cost-optimized-architectures",
      "title": "Design Cost-Optimized Architectures",
      "weight": 20,
      "summary": "Reduce total cost through suitable purchase models, right-sizing, lifecycle choices, and fewer unnecessary data hops.",
      "cards": [
        {
          "id": "cost-capacity",
          "title": "On-Demand, Savings Plans, Reserved Instances, and Spot",
          "summary": "Pay differently for flexibility, predictable usage, and interruptible work.",
          "analogy": "Rent a car as needed, commit to regular use, or accept a spare vehicle that can be reclaimed.",
          "bullets": [
            "On-Demand fits unpredictable short-lived demand without usage commitment. Savings Plans trade a spend commitment for eligible usage discounts; match plan scope to flexibility needs.",
            "Reserved Instances offer discounts for matching configurations; some zonal EC2 RI configurations include capacity reservation, but a discount alone is not universal capacity assurance.",
            "Spot fits fault-tolerant interruptible work such as checkpointed batch processing. Diversify capacity pools and keep a suitable baseline for noninterruptible demand."
          ],
          "examTip": "Do not put an unrecoverable single critical task on Spot merely because it is cheaper.",
          "tags": [
            "cost"
          ],
          "sourceIds": [
            "purchase",
            "cost"
          ]
        },
        {
          "id": "right-sizing",
          "title": "Right-size and scale from measured demand",
          "summary": "Reduce paid idle resources without violating performance or resilience targets.",
          "analogy": "Use enough checkout lanes for the queue, not the largest store you can rent.",
          "bullets": [
            "Measure CPU, memory, I/O, and latency before resizing; use Auto Scaling and schedules where demand supports them.",
            "Consider compatible Graviton/architecture options and managed/serverless services when total operational burden is lower and requirements fit.",
            "Treat commitments as a later optimization after sizing; track budgets, cost allocation tags, and Cost Explorer rather than relying on one low list price."
          ],
          "examTip": "Lowest compute hourly cost can lose once licensing, operational work, data movement, and recovery requirements are included.",
          "tags": [
            "right"
          ],
          "sourceIds": [
            "cost",
            "asg",
            "ec2",
            "cost-tools"
          ]
        },
        {
          "id": "s3-tiering",
          "title": "S3 classes, lifecycle, and retention economics",
          "summary": "Trade access frequency, retrieval delay, availability, and minimum-duration costs deliberately.",
          "analogy": "Keep daily tools on the desk, occasional tools in a cupboard, and archives in off-site storage.",
          "bullets": [
            "Standard fits frequent access; Intelligent-Tiering moves eligible data among tiers when access patterns are uncertain. Standard-IA and One Zone-IA fit less frequent access, with retrieval/minimum-duration costs.",
            "Glacier Instant Retrieval gives millisecond access to infrequent archive data; Glacier Flexible Retrieval and Deep Archive require restore workflows and slower retrieval options.",
            "Lifecycle rules transition/expire objects and can clean incomplete multipart uploads and old versions. One Zone classes trade away multi-AZ resilience; do not use them for the sole irreplaceable copy."
          ],
          "examTip": "Rarely accessed does not automatically mean Deep Archive: check retrieval-time requirements, object sizes, requests, and early-deletion charges.",
          "tags": [
            "s3"
          ],
          "sourceIds": [
            "s3-classes",
            "s3-lifecycle"
          ]
        },
        {
          "id": "storage-cost",
          "title": "Reduce storage cost without changing required semantics",
          "summary": "Choose the smallest total-cost design that still meets I/O and recovery needs.",
          "analogy": "Do not buy a shared office filing room when one desk drawer is all you need.",
          "bullets": [
            "Use gp3 for suitable general block storage and tune throughput/IOPS only as needed; evaluate io2 for an actual demanding latency/IOPS requirement.",
            "Clean up unattached volumes, obsolete snapshots, unused file data, and old object versions according to retention policy; deletion has recovery consequences.",
            "Choose EFS/FSx when shared file semantics are necessary; S3 can be cheaper for suitable objects but is not a transparent filesystem replacement."
          ],
          "examTip": "Compare storage capacity plus provisioned performance, requests, throughput modes, backups, and data transfer.",
          "tags": [
            "storage"
          ],
          "sourceIds": [
            "cost",
            "ebs",
            "efs",
            "fsx",
            "s3-classes"
          ]
        },
        {
          "id": "network-cost",
          "title": "Reduce NAT and data-transfer charges",
          "summary": "Avoid unnecessary processing hops and expensive data movement while preserving security.",
          "analogy": "Every toll road and border crossing adds to a delivery bill.",
          "bullets": [
            "S3/DynamoDB gateway endpoints avoid NAT processing for matching traffic and have no additional endpoint charge; interface endpoints have their own hourly/data costs.",
            "Keep chatty tiers appropriately placed and evaluate cross-AZ/Region transfer, load-balancer processing, and internet egress; do not remove required AZ redundancy just to avoid traffic charges.",
            "CloudFront caching and compression can reduce origin demand and suitable repeated delivery costs. Review traffic paths before assuming all private traffic is free."
          ],
          "examTip": "Compute the whole route and expected volume; interface endpoints are not universally cheaper than NAT.",
          "tags": [
            "network"
          ],
          "sourceIds": [
            "endpoints",
            "privatelink",
            "nat",
            "cf",
            "cost"
          ]
        },
        {
          "id": "database-cost",
          "title": "Database and analytics cost levers",
          "summary": "Match capacity and query patterns to demand rather than paying to scan or idle.",
          "analogy": "Reserve regular seats and pay for extra diners only when they arrive.",
          "bullets": [
            "DynamoDB on-demand fits variable or uncertain throughput; provisioned capacity with appropriate scaling can suit predictable workloads. Avoid scans and unneeded index projections.",
            "Cache suitable repeated database reads and use right-sized relational capacity; adding replicas costs money and does not speed all write workloads.",
            "For Athena, use partition pruning and suitable compressed columnar data; choose Redshift when warehouse workload and economics justify it."
          ],
          "examTip": "A new cache can add cost and staleness; justify it with measured hit rates and a valid consistency model.",
          "tags": [
            "database"
          ],
          "sourceIds": [
            "ddb",
            "indexes",
            "cache",
            "athena",
            "redshift",
            "cost"
          ]
        },
        {
          "id": "hybrid-data-movement",
          "title": "Storage Gateway, DataSync, and Snow family context",
          "summary": "Choose continuous hybrid access, online transfer, or an available physical-transfer option.",
          "analogy": "Storage Gateway is a local service window, DataSync a moving crew, Snowball an old physical moving-crate option.",
          "bullets": [
            "Storage Gateway bridges supported on-premises file, volume, or tape access patterns with AWS storage; it is not just a one-time copy command.",
            "DataSync automates supported online data transfers and verification/scheduling. Size the available network bandwidth and transfer deadline.",
            "Snowball Edge is a legacy exam-context offline/edge option. Since November 7, 2025 it is not available to new customers; verify eligibility for existing customers. New designs should evaluate DataSync, Data Transfer Terminal, or partner options as documented."
          ],
          "examTip": "For a physical migration scenario, identify the bandwidth constraint, then check current product eligibility; never recommend ordering Snowball unconditionally.",
          "tags": [
            "hybrid"
          ],
          "sourceIds": [
            "gateway",
            "datasync",
            "snow",
            "snow-history"
          ]
        },
        {
          "id": "managed-tradeoffs",
          "title": "Optimize operational cost, not just service count",
          "summary": "Prefer managed building blocks when they satisfy the workload constraints.",
          "analogy": "Hiring a specialist may cost less overall than owning every tool and maintaining it yourself.",
          "bullets": [
            "ECS with Fargate, Lambda, managed databases, and managed integrations can reduce server maintenance for compatible workloads; they do not eliminate architecture and governance work.",
            "Compare predictable sustained resource use against event-driven pricing. Include cold starts, concurrency, control, portability, and service limits.",
            "Keep observability, backups, security, and DR in the cost model; an inexpensive system that cannot meet the business target is not a valid optimization."
          ],
          "examTip": "Least operational overhead is a tie-breaker only after functionality, security, performance, availability, and cost requirements are satisfied.",
          "tags": [
            "managed"
          ],
          "sourceIds": [
            "cost",
            "ecs",
            "lambda",
            "backup"
          ]
        }
      ]
    }
  ],
  "decisionCards": [
    {
      "id": "security-groups-vs-nacls",
      "title": "Security group versus NACL",
      "summary": "Choose the correct filtering boundary and state behavior.",
      "analogy": "Room guest list versus neighborhood checkpoint.",
      "bullets": [
        "Use security groups for resource/interface allow rules and NACLs for explicit subnet boundary filtering.",
        "Both layers must permit a connection; a permissive security group cannot bypass a NACL deny."
      ],
      "examTip": "Check return-path ephemeral ports before blaming application code.",
      "tags": [
        "security"
      ],
      "sourceIds": [
        "sg",
        "nacl"
      ],
      "comparisons": [
        {
          "option": "Security group",
          "pickWhen": "Workload-level stateful allowed traffic, including references to supported peer security groups.",
          "watchOut": "Allow rules only; not a subnet-wide explicit-deny mechanism."
        },
        {
          "option": "NACL",
          "pickWhen": "Subnet-level allow/deny control or explicit source blocking.",
          "watchOut": "Stateless; numbered first-match evaluation; account for return traffic."
        }
      ]
    },
    {
      "id": "database-availability",
      "title": "Multi-AZ versus read replica versus multi-Region",
      "summary": "Distinguish local availability, read capacity, and geographic disaster recovery.",
      "analogy": "Backup driver, extra reader desk, or a distant branch office.",
      "bullets": [
        "Choose the failure scope before choosing a replication mechanism.",
        "Availability, throughput, recovery time, and recovery point are separate requirements."
      ],
      "examTip": "Check whether the prompt means a Multi-AZ DB instance deployment or a Multi-AZ DB cluster.",
      "tags": [
        "database"
      ],
      "sourceIds": [
        "rds-az",
        "rds-replica",
        "aurora",
        "dr"
      ],
      "comparisons": [
        {
          "option": "Multi-AZ",
          "pickWhen": "Automatic local failover for an AZ/instance failure.",
          "watchOut": "A DB instance standby is nonreadable; DB clusters have readable standbys. Not Regional DR."
        },
        {
          "option": "Read replica",
          "pickWhen": "Offload read queries or create an appropriately planned promotion path.",
          "watchOut": "Generally asynchronous, can lag, and applications must route reads appropriately."
        },
        {
          "option": "Multi-Region design",
          "pickWhen": "Regional outage recovery or regional serving requirements.",
          "watchOut": "Adds replication, conflict/data-loss, cutover, failback, and cost considerations."
        }
      ]
    },
    {
      "id": "vpc-endpoints",
      "title": "Gateway endpoint versus interface endpoint",
      "summary": "Pick the private service path that supports the required network origin and service.",
      "analogy": "Route-table shortcut versus private-IP service doorway.",
      "bullets": [
        "Endpoints remove the need for an internet/NAT hop only for traffic that actually uses that endpoint.",
        "Validate DNS, route tables, security groups, endpoint policies, and service permissions together."
      ],
      "examTip": "The phrase private access does not imply a gateway endpoint supports every service or on-premises path.",
      "tags": [
        "vpc"
      ],
      "sourceIds": [
        "endpoints",
        "privatelink",
        "gateway-s3"
      ],
      "comparisons": [
        {
          "option": "Gateway endpoint",
          "pickWhen": "S3 or DynamoDB traffic from the associated VPC using route tables.",
          "watchOut": "Not usable through VPN, Direct Connect, peering, or Transit Gateway as a shared endpoint; no endpoint security group."
        },
        {
          "option": "Interface endpoint",
          "pickWhen": "PrivateLink-supported service access using private endpoint ENIs; suitable hybrid access with reachability/DNS.",
          "watchOut": "Hourly/data charges, security groups, and DNS design apply."
        }
      ]
    },
    {
      "id": "load-balancers",
      "title": "ALB versus NLB versus GWLB",
      "summary": "Choose based on protocol and routing requirements.",
      "analogy": "Read a URL, forward a socket, or send packets through inspectors.",
      "bullets": [
        "Use layer-7 behavior when HTTP routing rules matter, and layer-4 behavior when connection/protocol needs dominate.",
        "Place the load-balancing tier within a complete health, capacity, and security design."
      ],
      "examTip": "Do not choose NLB merely because a scenario says high performance if it also requires path routing.",
      "tags": [
        "load"
      ],
      "sourceIds": [
        "elb"
      ],
      "comparisons": [
        {
          "option": "ALB",
          "pickWhen": "HTTP(S), host/path routing, and supported web application integrations.",
          "watchOut": "Not the general solution for arbitrary UDP traffic."
        },
        {
          "option": "NLB",
          "pickWhen": "TCP/UDP/TLS and static IP/network endpoint requirements.",
          "watchOut": "Does not provide ALB-style HTTP path routing."
        },
        {
          "option": "GWLB",
          "pickWhen": "Scale a supported transparent inspection appliance fleet.",
          "watchOut": "Not a replacement for an ordinary web application load balancer."
        }
      ]
    },
    {
      "id": "storage-models",
      "title": "S3 versus EFS versus EBS",
      "summary": "Start with object, shared file, or block semantics.",
      "analogy": "Parcel warehouse, shared filing room, or machine disk.",
      "bullets": [
        "A capacity or price comparison is meaningless until the application access model fits.",
        "Choose the required durability, AZ scope, protocol, and backup pattern after selecting storage semantics."
      ],
      "examTip": "Many EC2 Linux instances needing the same mounted files usually point to EFS rather than independent EBS disks.",
      "tags": [
        "storage"
      ],
      "sourceIds": [
        "s3-classes",
        "efs",
        "ebs"
      ],
      "comparisons": [
        {
          "option": "S3",
          "pickWhen": "Objects accessed by key/API, backups, media, and suitable data lakes.",
          "watchOut": "Not a normal POSIX filesystem or boot block device."
        },
        {
          "option": "EFS",
          "pickWhen": "Shared NFS files across compatible clients.",
          "watchOut": "Check deployment resilience, throughput, and file-operation cost."
        },
        {
          "option": "EBS",
          "pickWhen": "AZ-local block storage for EC2, boot disks, and suitable database volumes.",
          "watchOut": "Not automatically cross-AZ or a broadly shareable file service."
        }
      ]
    },
    {
      "id": "messaging-patterns",
      "title": "SQS versus SNS versus Kinesis",
      "summary": "Choose work distribution, fanout notifications, or replayable streaming.",
      "analogy": "Order tray, loudspeaker, or recorded conveyor belt.",
      "bullets": [
        "Consumers of one queue share work; subscribers to a topic receive their own deliveries; stream consumers maintain their own progress.",
        "Ordering and retention are configured service-specific properties, not something to assume from the word event."
      ],
      "examTip": "Several services must independently read and replay a time-ordered data feed: evaluate Kinesis, not a single SQS queue.",
      "tags": [
        "messaging"
      ],
      "sourceIds": [
        "sqs",
        "sns",
        "kinesis"
      ],
      "comparisons": [
        {
          "option": "SQS",
          "pickWhen": "Buffer jobs for workers, absorb bursts, and retry failures.",
          "watchOut": "Standard can duplicate/reorder; FIFO ordering is per group; visibility is not deletion."
        },
        {
          "option": "SNS",
          "pickWhen": "Push the same event to multiple interested subscribers.",
          "watchOut": "Use subscriber queues for durable independent buffering and backpressure."
        },
        {
          "option": "Kinesis Data Streams",
          "pickWhen": "Multiple consumers, ordered-per-shard streaming, and replay within retention.",
          "watchOut": "Plan capacity/partitioning and consumer checkpoints; not a delete-on-consume work queue."
        }
      ]
    },
    {
      "id": "disaster-recovery",
      "title": "Backup/restore, pilot light, warm standby, and active/active",
      "summary": "Trade recovery readiness against ongoing cost and operational complexity.",
      "analogy": "Stored building plans, a lit furnace, a small operating branch, or several live branches.",
      "bullets": [
        "Lower RTO/RPO usually requires more prepared compute, fresher data, and more practiced automation.",
        "These are patterns, not promised numerical recovery times; application dependencies and data consistency determine results."
      ],
      "examTip": "Pick the least-cost pattern that can actually meet the stated RTO and RPO, then test it.",
      "tags": [
        "disaster"
      ],
      "sourceIds": [
        "dr",
        "backup"
      ],
      "comparisons": [
        {
          "option": "Backup/restore",
          "pickWhen": "Longer recovery time/data-loss windows are acceptable and low standby cost matters.",
          "watchOut": "Must restore data and provision/reconfigure capacity; backups must exist outside the failure scope."
        },
        {
          "option": "pilot light",
          "pickWhen": "Keep core data/services replicated while most recovery compute can be created later.",
          "watchOut": "Must scale/provision and activate application components before serving full traffic."
        },
        {
          "option": "warm standby",
          "pickWhen": "A scaled-down working environment can scale up during recovery.",
          "watchOut": "Costs more continuously; capacity, replication, DNS, and cutover still need testing."
        },
        {
          "option": "active/active",
          "pickWhen": "Multiple Regions serve live traffic and strict availability needs justify complexity.",
          "watchOut": "Write coordination, conflicts, failure isolation, routing, and failback are difficult; not automatically zero data loss."
        }
      ]
    },
    {
      "id": "hybrid-link-choice",
      "title": "Direct Connect versus VPN",
      "summary": "Choose the connection and redundancy model for bandwidth, timeline, and encryption.",
      "analogy": "Reserved road versus encrypted tunnel over public roads.",
      "bullets": [
        "Private connectivity and encryption are different properties.",
        "Use redundant links and routing for availability; a single dedicated circuit is still a single dependency."
      ],
      "examTip": "A requirement for immediate setup or IPsec encryption does not by itself imply Direct Connect.",
      "tags": [
        "hybrid"
      ],
      "sourceIds": [
        "dx",
        "vpn",
        "dx-encryption"
      ],
      "comparisons": [
        {
          "option": "Direct Connect",
          "pickWhen": "Dedicated connectivity and more consistent network characteristics.",
          "watchOut": "Provisioning, resilience, and encryption need explicit design; not encrypted by default."
        },
        {
          "option": "Site-to-Site VPN",
          "pickWhen": "Encrypted hybrid connectivity or a backup path over an IP network.",
          "watchOut": "Internet-path bandwidth/latency variation and tunnel/routing failover matter."
        }
      ]
    }
  ],
  "limits": [
    {
      "id": "limit-lambda",
      "title": "Lambda limits: distinguish execution modes",
      "summary": "Know default-mode limits and the current Managed Instances exception.",
      "analogy": "A workbench has a timer, a memory budget, and a limit on concurrent benches.",
      "bullets": [
        "Default Lambda timeout: 900 seconds (15 minutes). Memory: 128–10,240 MB (maximum commonly called 10 GB).",
        "Current Lambda Managed Instances supports up to 5,400 seconds (90 minutes) for asynchronous and eligible event source mapping invocations; synchronous, Amazon MQ, and DocumentDB cases remain limited to 15 minutes.",
        "Default Regional account concurrency is 1,000 and is adjustable; new accounts may start lower. Reserved/provisioned concurrency is not a universal increase of the account quota."
      ],
      "examTip": "Do not turn the common 15-minute exam-context rule into a false all-modes statement. Check mode and invocation type.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "lambda-quotas",
        "lambda-mode"
      ]
    },
    {
      "id": "limit-s3-size",
      "title": "S3 object and multipart size: updated limits",
      "summary": "Do not copy the legacy 5 TB object limit into a current hard-limit table.",
      "analogy": "A large parcel is split into numbered crates; crate count and size set the ceiling.",
      "bullets": [
        "AWS advertises up to 50 TB per object; its object documentation gives the precise multipart-derived ceiling as approximately 53.7 TB (48.8 TiB). The old 5 TB figure is legacy, not the current object maximum.",
        "Multipart: up to 10,000 parts, 5 MiB–5 GiB per part, except the last part has no minimum. Plan part size so the count does not overflow.",
        "A single PUT is limited to 5 GB; objects above that use multipart APIs. Object maximum and single-request maximum are not the same."
      ],
      "examTip": "This sheet does not claim that the exam expects an outdated object maximum. Read the request and units carefully.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "s3-size",
        "s3-multipart",
        "s3-upload"
      ]
    },
    {
      "id": "limit-sqs",
      "title": "SQS message, retention, and visibility limits",
      "summary": "Separate payload size, message lifetime, in-flight hiding, and polling wait.",
      "analogy": "Envelope capacity, shelf life, borrowed time, and time waiting at the counter are different clocks.",
      "bullets": [
        "Maximum message size: 1,048,576 bytes (1 MiB). The legacy 256 KiB limit (often written 256 KB in older notes) is not the current maximum; larger application payloads can use an S3-pointer/extended-client pattern.",
        "Retention defaults to 4 days and can be 1 minute–14 days. Visibility defaults to 30 seconds and can be 0–12 hours; 12 hours is not a retention limit.",
        "Long polling waits up to 20 seconds to reduce empty receives. FIFO send deduplication has a 5-minute window; application processing still needs idempotency."
      ],
      "examTip": "Visibility expiry makes work available again, not successfully completed. Delete only after successful handling.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "sqs-quotas",
        "sqs-visibility",
        "sqs-fifo",
        "long-poll"
      ]
    },
    {
      "id": "limit-vpc-ipv4",
      "title": "VPC and subnet IPv4 sizing",
      "summary": "Reserve enough address capacity for growth, endpoints, and scaling.",
      "analogy": "Leave empty parking spaces for building services before counting customer spaces.",
      "bullets": [
        "Ordinary VPC IPv4 CIDR blocks and IPv4 subnets use /16 through /28 sizes; this is not the IPv6 prefix-size rule.",
        "AWS reserves the first four and last IPv4 addresses in a subnet in the standard case; plan usable capacity, not just total address count. BYOIP has documented reservation exceptions.",
        "CIDR overlap can prevent peering or routed connectivity. Plan address space before connecting environments."
      ],
      "examTip": "Do not apply the five-address subtraction or IPv4 prefix sizes blindly to IPv6.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "vpc-cidr",
        "subnet-cidr",
        "peering"
      ]
    },
    {
      "id": "limit-ddb",
      "title": "DynamoDB item and LSI constraints",
      "summary": "Model item size and indexed collections before choosing keys.",
      "analogy": "An index drawer has a different limit from the whole library.",
      "bullets": [
        "Maximum item size is 400 KB, including attribute names and values; large binary documents often belong in S3 with an item pointer.",
        "For tables with LSIs, the item collection for a given partition key has a 10 GB limit, including table items and LSI projections.",
        "GSIs offer different keys and eventual reads; LSIs share the partition key and can support strongly consistent reads. Index quotas are distinct from item-size limits."
      ],
      "examTip": "An LSI cannot be added later to repair an unplanned query pattern; create it with the table.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "ddb-quotas",
        "indexes",
        "lsi"
      ]
    },
    {
      "id": "limit-s3-minimums",
      "title": "S3 minimum storage durations are billing rules",
      "summary": "Avoid treating low per-GB archive pricing as the complete cost.",
      "analogy": "A cheap storage locker can still charge a minimum rental period.",
      "bullets": [
        "Standard-IA and One Zone-IA have 30-day minimum storage durations; Glacier Instant Retrieval and Glacier Flexible Retrieval have 90-day minimums; Deep Archive has 180 days.",
        "Deleting or transitioning earlier can incur minimum-duration charges. Retrieval/request/metadata overhead and minimum billable sizes also matter.",
        "Current lifecycle rules by default do not transition objects smaller than 128 KB; configurations and supported override rules require deliberate review."
      ],
      "examTip": "A minimum storage duration is not a prohibition on deletion; it affects billing.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "s3-classes",
        "s3-lifecycle"
      ]
    },
    {
      "id": "limit-gp3",
      "title": "gp3 baseline versus configurable performance",
      "summary": "Distinguish included baseline performance from current maximums and instance limits.",
      "analogy": "A water pipe has a standard flow and optional paid upgrades, but the house plumbing can still bottleneck it.",
      "bullets": [
        "gp3 includes a baseline of 3,000 IOPS and 125 MiB/s throughput; additional provisioned performance is charged separately.",
        "Current gp3 documentation permits up to 80,000 IOPS and 2,000 MiB/s, subject to the documented size/IOPS ratios. Outposts has lower maxima of 16,000 IOPS and 1,000 MiB/s; instance limits may be lower still.",
        "Check current volume, size-dependent, platform, and instance EBS limits before choosing a maximum. A larger provisioned volume number cannot bypass the instance bottleneck."
      ],
      "examTip": "Do not memorize an old gp3 maximum as universal across current platforms; baseline and effective end-to-end throughput are different.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "gp3",
        "ebs"
      ]
    },
    {
      "id": "limit-exam",
      "title": "Exam structure and scaled score",
      "summary": "Understand the assessment format without turning the passing score into a raw percentage.",
      "analogy": "A calibrated score scale is not a direct count of correct questions.",
      "bullets": [
        "The published exam format is 65 questions in 130 minutes; 50 are scored and 15 are unscored, and candidates cannot identify which are unscored.",
        "The minimum passing scaled score is 720 on a 100–1,000 scale, not 72% correct. Unanswered questions count as incorrect; there is no penalty for guessing."
      ],
      "examTip": "Answer every question and follow the requested number of selections; this sheet does not promise a passing result.",
      "tags": [
        "limit"
      ],
      "sourceIds": [
        "exam",
        "exam-overview"
      ]
    }
  ],
  "strategies": [
    {
      "id": "strategy-requirements",
      "title": "Read constraints before recognizing products",
      "summary": "Translate the scenario into requirements before matching a service name.",
      "analogy": "Write the destination and cargo requirements before picking a vehicle.",
      "bullets": [
        "Identify availability scope, RTO/RPO, latency, access protocol, consistency, security, traffic shape, budget, and operational effort.",
        "Eliminate options that fail a hard requirement first. Use least operational overhead or lowest cost as a tie-breaker only when the surviving options meet the requirements."
      ],
      "examTip": "Keywords are clues, not absolute rules: an ALB is not correct for every internet-facing workload.",
      "tags": [
        "strategy"
      ],
      "sourceIds": [
        "exam",
        "cost",
        "dr"
      ]
    },
    {
      "id": "strategy-time",
      "title": "Budget time and preserve review room",
      "summary": "Use an explicit time plan rather than spending too long on one difficult item.",
      "analogy": "Do a first circuit of the race before returning to the toughest obstacles.",
      "bullets": [
        "An illustrative first-pass plan is about 100 minutes for 65 items, leaving about 30 minutes for marked questions and review; adjust to your actual pace.",
        "A rough two-minute ceiling on a difficult first-pass item must include a review-buffer plan, not consume the whole 130 minutes on every question. Mark uncertain items and move on."
      ],
      "examTip": "Read all options, choose the requested number, answer every question, and revisit marked items with remaining time.",
      "tags": [
        "strategy"
      ],
      "sourceIds": [
        "exam",
        "exam-overview"
      ]
    },
    {
      "id": "strategy-failure-path",
      "title": "Trace the failure path end to end",
      "summary": "Check all tiers and dependency failures, not only the component named in the question.",
      "analogy": "A chain is only as strong as its least recoverable link.",
      "bullets": [
        "Trace DNS → edge → load balancer → application → state → database → backup, plus secrets, identity, and network egress.",
        "Ask whether recovery handles an instance, AZ, Region, credential compromise, accidental deletion, or data corruption; these require different controls."
      ],
      "examTip": "Multi-AZ, read scaling, replication, and backup solve different problems. Identify the stated failure first.",
      "tags": [
        "strategy"
      ],
      "sourceIds": [
        "dr",
        "backup",
        "rds-az"
      ]
    },
    {
      "id": "strategy-conditional-clues",
      "title": "Use conditional scenario clues",
      "summary": "Keep useful service mnemonics without converting them into universal prescriptions.",
      "analogy": "A road sign suggests a route, but the vehicle and destination still matter.",
      "bullets": [
        "Bursty decoupled work suggests a queue; replayable streaming suggests a stream; a shared filesystem suggests a file service. Validate ordering, retention, protocol, and consumer behavior.",
        "Managed/serverless often reduces operations when supported, but resource control, runtime duration, compliance, cost, or compatibility may favor another option."
      ],
      "examTip": "Prefer the option that meets every explicit constraint, not the one with the most familiar AWS acronym.",
      "tags": [
        "strategy"
      ],
      "sourceIds": [
        "exam",
        "sqs",
        "kinesis",
        "efs",
        "cost"
      ]
    },
    {
      "id": "strategy-review-evidence",
      "title": "Study scenarios and verify changing facts",
      "summary": "Use practice mistakes to build a decision model rather than memorize answer letters.",
      "analogy": "Keep a repair log of why the wrong route failed, not merely which road was correct.",
      "bullets": [
        "For each practice miss, state the requirement, why the correct architecture meets it, and the failure/cost/security property of the distractors.",
        "Review official AWS sources for changing quotas, product availability, and new modes. This is a dated revision aid, not an exhaustive specification or an official question bank."
      ],
      "examTip": "Learn units and adjustable-versus-hard constraints; do not assume older notes reflect current S3, SQS, or Lambda limits.",
      "tags": [
        "strategy"
      ],
      "sourceIds": [
        "exam",
        "lambda-quotas",
        "s3-size",
        "sqs-quotas",
        "snow"
      ]
    }
  ],
  "sources": [
    {
      "id": "iam",
      "label": "IAM identities and access",
      "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
    },
    {
      "id": "iam-practices",
      "label": "IAM security best practices",
      "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
    },
    {
      "id": "org",
      "label": "AWS Organizations policies",
      "url": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
    },
    {
      "id": "kms",
      "label": "AWS KMS overview",
      "url": "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"
    },
    {
      "id": "hsm",
      "label": "AWS CloudHSM overview",
      "url": "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html"
    },
    {
      "id": "secrets",
      "label": "Secrets Manager overview",
      "url": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
    },
    {
      "id": "parameter",
      "label": "Parameter Store",
      "url": "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"
    },
    {
      "id": "guard",
      "label": "Amazon GuardDuty",
      "url": "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"
    },
    {
      "id": "inspector",
      "label": "Amazon Inspector",
      "url": "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"
    },
    {
      "id": "macie",
      "label": "Amazon Macie",
      "url": "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
    },
    {
      "id": "waf",
      "label": "AWS WAF and Shield",
      "url": "https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html"
    },
    {
      "id": "trail",
      "label": "AWS CloudTrail",
      "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
    },
    {
      "id": "config",
      "label": "AWS Config",
      "url": "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
    },
    {
      "id": "vpc",
      "label": "VPC concepts",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
    },
    {
      "id": "sg",
      "label": "Security group rules",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"
    },
    {
      "id": "nacl",
      "label": "Network ACLs",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"
    },
    {
      "id": "nat",
      "label": "NAT gateways",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html"
    },
    {
      "id": "endpoints",
      "label": "Gateway endpoints",
      "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"
    },
    {
      "id": "privatelink",
      "label": "AWS PrivateLink concepts",
      "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html"
    },
    {
      "id": "peering",
      "label": "VPC peering",
      "url": "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html"
    },
    {
      "id": "tgw",
      "label": "Transit Gateway",
      "url": "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html"
    },
    {
      "id": "dx",
      "label": "AWS Direct Connect",
      "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"
    },
    {
      "id": "vpn",
      "label": "Site-to-Site VPN",
      "url": "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
    },
    {
      "id": "r53",
      "label": "Route 53 routing policies",
      "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"
    },
    {
      "id": "cf",
      "label": "CloudFront overview",
      "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
    },
    {
      "id": "cf-tls",
      "label": "CloudFront HTTPS requirements",
      "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html"
    },
    {
      "id": "ga",
      "label": "Global Accelerator overview",
      "url": "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"
    },
    {
      "id": "ec2",
      "label": "EC2 instance types",
      "url": "https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html"
    },
    {
      "id": "asg",
      "label": "EC2 Auto Scaling",
      "url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"
    },
    {
      "id": "elb",
      "label": "Elastic Load Balancing",
      "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"
    },
    {
      "id": "ecs",
      "label": "Amazon ECS launch types",
      "url": "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html"
    },
    {
      "id": "eks",
      "label": "Amazon EKS",
      "url": "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
    },
    {
      "id": "lambda",
      "label": "Lambda concurrency",
      "url": "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html"
    },
    {
      "id": "s3-classes",
      "label": "S3 storage classes",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    },
    {
      "id": "s3-encryption",
      "label": "S3 data encryption",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html"
    },
    {
      "id": "s3-versioning",
      "label": "S3 Versioning",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html"
    },
    {
      "id": "ebs",
      "label": "EBS volume types",
      "url": "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html"
    },
    {
      "id": "efs",
      "label": "Amazon EFS",
      "url": "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"
    },
    {
      "id": "fsx",
      "label": "Amazon FSx",
      "url": "https://aws.amazon.com/fsx/"
    },
    {
      "id": "gateway",
      "label": "Storage Gateway overview",
      "url": "https://aws.amazon.com/storagegateway/"
    },
    {
      "id": "datasync",
      "label": "AWS DataSync",
      "url": "https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html"
    },
    {
      "id": "rds-replica",
      "label": "RDS read replicas",
      "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
    },
    {
      "id": "aurora",
      "label": "Aurora overview",
      "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"
    },
    {
      "id": "ddb",
      "label": "DynamoDB core components",
      "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html"
    },
    {
      "id": "indexes",
      "label": "DynamoDB secondary indexes",
      "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html"
    },
    {
      "id": "dax",
      "label": "DynamoDB Accelerator",
      "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html"
    },
    {
      "id": "cache",
      "label": "ElastiCache engines",
      "url": "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html"
    },
    {
      "id": "athena",
      "label": "Amazon Athena",
      "url": "https://docs.aws.amazon.com/athena/latest/ug/what-is.html"
    },
    {
      "id": "glue",
      "label": "AWS Glue",
      "url": "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html"
    },
    {
      "id": "redshift",
      "label": "Amazon Redshift",
      "url": "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html"
    },
    {
      "id": "kinesis",
      "label": "Kinesis Data Streams",
      "url": "https://docs.aws.amazon.com/streams/latest/dev/introduction.html"
    },
    {
      "id": "sqs",
      "label": "Amazon SQS",
      "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"
    },
    {
      "id": "sns",
      "label": "Amazon SNS",
      "url": "https://docs.aws.amazon.com/sns/latest/dg/welcome.html"
    },
    {
      "id": "events",
      "label": "Amazon EventBridge",
      "url": "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
    },
    {
      "id": "step",
      "label": "AWS Step Functions",
      "url": "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"
    },
    {
      "id": "dr",
      "label": "Disaster recovery strategies",
      "url": "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"
    },
    {
      "id": "backup",
      "label": "AWS Backup",
      "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"
    },
    {
      "id": "cost",
      "label": "Cost optimization principles",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html"
    },
    {
      "id": "purchase",
      "label": "EC2 purchasing options",
      "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html"
    },
    {
      "id": "cloudwatch",
      "label": "Amazon CloudWatch",
      "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
    },
    {
      "id": "lambda-quotas",
      "label": "Lambda quotas and mode-specific limits",
      "url": "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html"
    },
    {
      "id": "s3-size",
      "label": "S3 object size and metadata",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html"
    },
    {
      "id": "s3-multipart",
      "label": "S3 multipart upload limits",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html"
    },
    {
      "id": "s3-upload",
      "label": "S3 upload methods",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html"
    },
    {
      "id": "sqs-quotas",
      "label": "SQS message quotas",
      "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html"
    },
    {
      "id": "sqs-fifo",
      "label": "SQS FIFO exactly-once processing scope",
      "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html"
    },
    {
      "id": "sqs-visibility",
      "label": "SQS visibility timeout",
      "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html"
    },
    {
      "id": "s3-ssec",
      "label": "SSE-C new bucket defaults FAQ",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-s3-c-encryption-setting-faq.html"
    },
    {
      "id": "snow",
      "label": "Snowball Edge availability",
      "url": "https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html"
    },
    {
      "id": "global-tables",
      "label": "DynamoDB global table consistency modes",
      "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-global-table-design.html"
    },
    {
      "id": "rds-az",
      "label": "RDS Multi-AZ deployments",
      "url": "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"
    },
    {
      "id": "vpc-cidr",
      "label": "VPC IPv4 CIDR rules",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html"
    },
    {
      "id": "subnet-cidr",
      "label": "Subnet CIDR rules",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html"
    },
    {
      "id": "exam",
      "label": "SAA-C03 exam guide",
      "url": "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
    },
    {
      "id": "exam-overview",
      "label": "Solutions Architect Associate exam overview",
      "url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
    },
    {
      "id": "s3-lifecycle",
      "label": "S3 lifecycle transition considerations",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html"
    },
    {
      "id": "s3-replication",
      "label": "S3 replication",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"
    },
    {
      "id": "ddb-quotas",
      "label": "DynamoDB constraints",
      "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html"
    },
    {
      "id": "snow-history",
      "label": "Snowball availability change history",
      "url": "https://docs.aws.amazon.com/snowball/latest/developer-guide/doc-history.html"
    },
    {
      "id": "lambda-mode",
      "label": "Lambda Managed Instances best practices",
      "url": "https://docs.aws.amazon.com/lambda/latest/dg/lambda-managed-instances-best-practices.html"
    },
    {
      "id": "s3-access",
      "label": "S3 access best practices",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html"
    },
    {
      "id": "gp3",
      "label": "EBS gp3 performance",
      "url": "https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html"
    },
    {
      "id": "long-poll",
      "label": "SQS long polling",
      "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html"
    },
    {
      "id": "lsi",
      "label": "DynamoDB local secondary indexes",
      "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html"
    },
    {
      "id": "s3-consistency",
      "label": "S3 consistency model",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
    },
    {
      "id": "aurora-global",
      "label": "Aurora Global Database",
      "url": "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"
    },
    {
      "id": "kms-envelope",
      "label": "KMS envelope encryption",
      "url": "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html"
    },
    {
      "id": "dx-encryption",
      "label": "Direct Connect encryption in transit",
      "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html"
    },
    {
      "id": "ec2-burst",
      "label": "Burstable performance instances and CPU credits",
      "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html"
    },
    {
      "id": "s3-presign",
      "label": "S3 presigned URL access",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html"
    },
    {
      "id": "s3-lock",
      "label": "S3 Object Lock",
      "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html"
    },
    {
      "id": "backup-vault",
      "label": "AWS Backup Vault Lock",
      "url": "https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html"
    },
    {
      "id": "cost-tools",
      "label": "AWS Cost Management overview",
      "url": "https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html"
    },
    {
      "id": "gateway-s3",
      "label": "S3 gateway endpoint considerations",
      "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html"
    }
  ]
};
