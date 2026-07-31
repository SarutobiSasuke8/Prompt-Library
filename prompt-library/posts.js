// prompt-library — blog post data source
// ---------------------------------------------------------------
// Posts are the dated, editorial half of the site. Articles
// (articles.js) are evergreen methodology; posts are written on a
// date and read in reverse-chronological order. Keep them separate.
//
// Each entry follows this schema:
//   id        unique integer, increment on add
//   title     post title
//   slug      lowercase-hyphenated, stable, used for share URLs
//   date      publish date, "YYYY-MM-DD" — drives ordering
//   updated   optional revision date, "YYYY-MM-DD"
//   excerpt   one- or two-line summary shown on the front page
//   author    author handle
//   tags      array of lowercase tag strings — front page chips
//   readTime  estimated read time string e.g. "6 min"
//   featured  boolean; at most one post should be true
//   body      array of content blocks (rendered by blocks.js)
//
// Block types (shared with articles.js — see blocks.js):
//   { type: "p",       text: "..." }                            paragraph
//   { type: "h3",      text: "..." }                            subheading
//   { type: "example", label: "...", text: "..." }              copyable block
//   { type: "callout", text: "..." }                            highlighted tip
//   { type: "list",    items: ["..."] }                         bulleted list
//   { type: "reference", title: "...", url: "..." }             source citation
//
// Validated in CI by scripts/validate-posts.js.
// ---------------------------------------------------------------

const POSTS = [

  {
    id: 1,
    title: "Why Your Prompt Works in Chat and Fails in Production",
    slug: "works-in-chat-fails-in-production",
    date: "2026-07-24",
    excerpt: "The gap between a prompt that impressed you once and a prompt that holds up across ten thousand calls is mostly about what you were unconsciously supplying.",
    author: "SarutobiSasuke",
    tags: ["production", "reliability", "evaluation"],
    readTime: "7 min",
    featured: true,
    body: [
      { type: "p", text: "You wrote a prompt. You tested it in a chat window. It produced something good, maybe something impressive. You shipped it behind an API call, and within a day you had support tickets about output that was truncated, off-format, or confidently wrong." },
      { type: "p", text: "This is the single most common failure pattern in applied prompting, and it is almost never caused by the model getting worse. It is caused by the chat window quietly doing work that your production code does not." },

      { type: "h3", text: "What the chat window was doing for you" },
      { type: "p", text: "When you iterate in a chat interface, you are supplying context you never wrote down. You saw a bad answer and rephrased. You pasted a document earlier in the thread and forgot it was still in scope. You accepted a partial answer because you could ask a follow-up. None of that survives the trip into a stateless API call." },
      { type: "list", items: [
        "Conversational repair — you corrected the model mid-thread and never encoded the correction.",
        "Latent context — earlier turns were still in the window, silently informing the answer.",
        "Human tolerance — you mentally discarded the parts that were wrong instead of counting them as failures.",
        "Single-sample bias — you saw one good generation and treated it as the expected case rather than a draw from a distribution."
      ]},
      { type: "callout", text: "A prompt you evaluated once is a prompt you have not evaluated. The unit of assessment is a distribution of outputs, not a favourite one." },

      { type: "h3", text: "The distribution problem" },
      { type: "p", text: "At any temperature above zero, your prompt does not have an output. It has an output distribution. Judging it from one sample is like judging a coin from one flip. The question is not 'is this good' but 'what fraction of draws are acceptable, and how bad is the worst one'." },
      { type: "p", text: "This reframing changes what you do next. You stop tweaking wording based on vibes and start running the same prompt twenty times against the same input to see the spread. The spread is usually wider than people expect, and the failure modes cluster — which is useful, because clustered failures are fixable ones." },

      { type: "h3", text: "Encode the repair, don't rely on it" },
      { type: "p", text: "Every time you corrected the model during iteration, you discovered a constraint. Production gets no correction turn, so the constraint has to move into the prompt itself." },
      { type: "example", label: "Before — relies on a follow-up turn", text: "Summarise the incident report below.\n\n{{report}}" },
      { type: "example", label: "After — encodes the corrections you kept making", text: "Summarise the incident report below.\n\nOutput exactly four sections, in this order:\nIMPACT — who was affected and for how long, in one sentence.\nCAUSE — the technical root cause. If the report does not state one, write \"not stated in report\".\nTIMELINE — bullet points, timestamps first, newest last.\nOPEN — unresolved questions the report leaves open.\n\nDo not speculate about cause. Do not recommend remediation.\nIf the report is too short to fill a section, write \"insufficient detail\" under that heading rather than inferring.\n\n{{report}}" },
      { type: "p", text: "The second version is longer and less elegant. It is also the one that survives contact with inputs you did not hand-pick. Note especially the instructions about what to do when the input is inadequate — production inputs are inadequate far more often than test inputs are." },

      { type: "h3", text: "Build the smallest possible eval" },
      { type: "p", text: "You do not need an evaluation framework to start. You need roughly twenty real inputs, saved to a file, and a way to run the prompt against all of them and eyeball the results side by side. That is enough to catch the majority of regressions, and it takes about an hour to set up." },
      { type: "p", text: "The inputs matter more than the tooling. Pull them from real traffic if you have it. Deliberately include the degenerate cases: the empty document, the one in the wrong language, the one that is three times longer than you designed for, the one that is adversarial. Those are the inputs that generate support tickets." },

      { type: "h3", text: "What this does not fix" },
      { type: "p", text: "None of the above helps with genuine model capability limits. If the task requires arithmetic over long tables, or reasoning that needs tool access the model does not have, better prompting narrows the gap without closing it. Knowing which of the two problems you have is worth more than another round of prompt tuning — and the honest answer is sometimes that the task needs a different architecture, not a better instruction." }
    ]
  },

  {
    id: 2,
    title: "Structured Output Is a Contract, Not a Preference",
    slug: "structured-output-is-a-contract",
    date: "2026-07-09",
    excerpt: "Asking politely for JSON is not a schema. The difference shows up the first time an unexpected field breaks a downstream parser at 3am.",
    author: "SarutobiSasuke",
    tags: ["structured-output", "reliability", "tooling"],
    readTime: "6 min",
    featured: false,
    body: [
      { type: "p", text: "There is a meaningful difference between a prompt that asks for JSON and a system that guarantees JSON. Most codebases contain the first and assume the second." },

      { type: "h3", text: "The polite request pattern" },
      { type: "example", label: "The pattern that eventually fails", text: "Return your answer as JSON with keys \"sentiment\" and \"confidence\". Only return JSON, no other text." },
      { type: "p", text: "This works most of the time, which is precisely what makes it dangerous. It fails on a small fraction of calls — a markdown fence wrapped around the object, an apology preamble, a trailing explanation, a confidence value rendered as \"high\" instead of a number. At a thousand calls a day, a one-percent failure rate is ten incidents." },

      { type: "h3", text: "Use the mechanism, not the request" },
      { type: "p", text: "Every major model provider now offers a real mechanism for this: tool/function calling with a declared schema, or a constrained JSON mode. These are not sugar over prompting. They constrain generation, so malformed output is not merely discouraged but structurally unavailable." },
      { type: "list", items: [
        "Declare the schema in the API call, not in the prompt text.",
        "Make every field required, then allow explicit nulls, rather than making fields optional. Absent and null-because-unknown are different states and you want to tell them apart.",
        "Prefer enums over free-text strings anywhere the value space is closed.",
        "Keep the schema flat where you can — deeply nested structures degrade quality more than most people expect."
      ]},
      { type: "callout", text: "If a field's value can be one of five things, say so in the schema. An enum removes an entire class of downstream normalisation code, and it improves the model's accuracy on the field as a side effect." },

      { type: "h3", text: "Still validate" },
      { type: "p", text: "Schema-constrained generation guarantees shape. It does not guarantee sense. A model can return a perfectly valid object where confidence is 0.99 and the sentiment is wrong, or where a date field is well-formed and refers to the wrong year." },
      { type: "p", text: "Validate the semantics at the boundary: range-check numbers, sanity-check dates against the document, confirm that referenced entities actually appear in the source. Treat model output the way you would treat a request body from an untrusted client, because in the ways that matter, it is one." },

      { type: "h3", text: "The reasoning-then-answer tension" },
      { type: "p", text: "Constrained output can suppress reasoning, and reasoning improves accuracy on hard tasks. The resolution is to give the reasoning somewhere to live inside the schema — a string field that comes before the answer fields, so the model writes its working first and the ordering is enforced." },
      { type: "example", label: "Reasoning inside the contract", text: "{\n  \"reasoning\": \"string — work through the evidence before answering\",\n  \"sentiment\": \"enum: positive | negative | neutral | mixed\",\n  \"confidence\": \"number 0-1\",\n  \"evidence_quote\": \"string — verbatim span from the input supporting the call\"\n}" },
      { type: "p", text: "Field order in the schema matters because generation is sequential. Putting the answer first and the reasoning after produces post-hoc rationalisation of a snap judgement, which is worse than no reasoning field at all — it gives you a plausible explanation for an answer that was not actually derived from it." },

      { type: "h3", text: "Where this breaks down" },
      { type: "p", text: "Constrained decoding costs something. On some providers it adds latency; on some tasks it measurably reduces answer quality compared to free generation, particularly for open-ended creative work. If the output is going to a human reader rather than a parser, the contract is usually not worth its price." }
    ]
  },

  {
    id: 3,
    title: "Context Windows Are Not Memory",
    slug: "context-windows-are-not-memory",
    date: "2026-06-18",
    excerpt: "A million-token window changed what is possible to put in front of a model. It did not change how much of it the model actually uses well.",
    author: "SarutobiSasuke",
    tags: ["context", "retrieval", "fundamentals"],
    readTime: "6 min",
    featured: false,
    body: [
      { type: "p", text: "Long context windows are routinely described as giving models memory. The metaphor is convenient and it is wrong in a way that produces bad system designs." },
      { type: "p", text: "A context window is working space, re-supplied in full on every single call. It is not storage, it does not persist, and — the part that catches people — its contents are not uniformly available to the model." },

      { type: "h3", text: "Position matters" },
      { type: "p", text: "Retrieval accuracy across a long context is not flat. Information near the beginning and the end of the window is reliably easier for the model to use than information buried in the middle. This has held across model generations and providers, even as absolute performance improved." },
      { type: "list", items: [
        "Put the instruction at the end, after the documents, when the context is long. It is the thing that must not get lost.",
        "Put the most important source material first or last, not in the middle of a pile.",
        "If you are stuffing twenty documents in, rank them before you insert them. Insertion order is a real parameter, not an implementation detail.",
        "Test retrieval explicitly: ask a question whose answer sits in the middle of your typical payload and see if it comes back."
      ]},

      { type: "h3", text: "More context is not free" },
      { type: "p", text: "Every token in the window costs money and latency on every call. A design that dumps an entire knowledge base into context on each request is paying to re-read the whole library to answer one question. Retrieval exists to avoid exactly that, and long windows did not make it obsolete — they made it less urgent, which is different." },
      { type: "callout", text: "The right question is not \"does it fit\" but \"does including it improve the answer more than it costs\". Those diverge much earlier than the window limit." },

      { type: "h3", text: "Irrelevant context actively hurts" },
      { type: "p", text: "This is the counterintuitive part. Padding the window with plausibly-related-but-actually-irrelevant material does not leave accuracy unchanged; it degrades it. The model has to discriminate, and discrimination is a task it can fail. A tight context of three relevant documents commonly beats a loose one of thirty." },
      { type: "p", text: "The practical consequence: aggressive filtering before insertion pays for itself twice, in cost and in quality. If your retrieval step returns fifty chunks and you insert all fifty because they fit, you are likely making the answer worse than inserting the top eight." },

      { type: "h3", text: "What to do about persistence" },
      { type: "p", text: "If you need something to persist across calls, you need to write it somewhere and re-supply it — a database, a file, a summary you regenerate. There is no state living inside the model between requests. Systems that appear to remember are re-reading something on every turn, and it is worth being explicit in your architecture about what that something is and who maintains it." },
      { type: "p", text: "The common failure here is unbounded conversation history: appending every turn forever until cost and latency degrade and the early turns stop being retrievable anyway. Summarise, evict, or both. Decide the policy deliberately rather than discovering it when the bill arrives." }
    ]
  },

  {
    id: 4,
    title: "Evaluating Prompts Without Building an Eval Framework",
    slug: "evaluating-prompts-without-a-framework",
    date: "2026-05-30",
    excerpt: "You can get most of the value of prompt evaluation from a folder of test inputs and an afternoon. The frameworks are for later, if ever.",
    author: "SarutobiSasuke",
    tags: ["evaluation", "testing", "methodology"],
    readTime: "5 min",
    featured: false,
    body: [
      { type: "p", text: "Prompt evaluation has acquired a tooling ecosystem disproportionate to what most teams need. If you are one person shipping one product, adopting an eval platform before you have twenty test cases is solving the wrong problem." },

      { type: "h3", text: "Start with the cases, not the tooling" },
      { type: "p", text: "The scarce resource in evaluation is not infrastructure. It is a set of inputs that represent what your system actually sees, paired with a defensible opinion about what good output looks like for each. That artefact is portable across every framework you might later adopt, which is a good reason to build it first." },
      { type: "list", items: [
        "Collect twenty real inputs. Real ones — from logs, from users, from the actual document pile.",
        "Include at least five degenerate cases: empty, enormous, wrong language, malformed, adversarial.",
        "For each, write down what an acceptable answer must contain and what would make it unacceptable.",
        "Store them as plain files in the repo, next to the prompt. Version them together."
      ]},

      { type: "h3", text: "Grade on failure modes, not scores" },
      { type: "p", text: "A single quality score out of ten is nearly useless — it compresses distinct problems into one number and makes regressions invisible. Grade against a checklist of specific failure modes instead, because those map directly onto prompt changes." },
      { type: "example", label: "A usable rubric", text: "For each output, mark yes/no:\n  [ ] Hallucinated a fact not present in the source\n  [ ] Missed a required section\n  [ ] Wrong output format\n  [ ] Speculated where the prompt said not to\n  [ ] Refused a reasonable request\n  [ ] Correct but unusably verbose\n\nA prompt change is an improvement only if it reduces one\ncolumn without increasing another." },
      { type: "callout", text: "Track the columns across versions. The pattern you are looking for is the fix that trades one failure mode for another — that is the change that feels like progress and is not." },

      { type: "h3", text: "On model-graded evaluation" },
      { type: "p", text: "Using a model to grade another model's output scales well and is genuinely useful, with two caveats that are frequently ignored. First, the grader inherits biases — it tends to prefer longer, more confident, more familiar-sounding answers. Second, a grader is itself a prompt that needs evaluating, and teams almost never do it." },
      { type: "p", text: "The reasonable middle path: grade by hand until you have a stable rubric, then automate that specific rubric, then spot-check the automated grades against your own judgement periodically. Skipping to the automated step means you are trusting a measurement instrument you have never calibrated." },

      { type: "h3", text: "When to adopt real tooling" },
      { type: "p", text: "When manual runs stop being feasible — multiple prompts, multiple models, a regression suite that takes an hour to eyeball. That is a real threshold and it does arrive. It just arrives later than the tooling vendors suggest, and arriving there with a well-curated case set is worth more than arriving early with an empty one." }
    ]
  },

  {
    id: 5,
    title: "What We Got Wrong Building This Library",
    slug: "what-we-got-wrong-building-this-library",
    date: "2026-05-12",
    excerpt: "A retrospective on the prompt library itself — the schema decisions that held up, the ones that did not, and the feature we were repeatedly wrong to want.",
    author: "SarutobiSasuke",
    tags: ["retrospective", "product", "methodology"],
    readTime: "6 min",
    featured: false,
    body: [
      { type: "p", text: "This site is a static library of system prompts with no build step, no framework, and no backend. Those constraints were chosen deliberately at the start. Some of them earned their keep and one of them keeps generating work. This is the honest accounting." },

      { type: "h3", text: "What held up: data separate from UI" },
      { type: "p", text: "Keeping the prompts in a plain, hand-editable JavaScript file rather than a database or a CMS turned out to be the highest-leverage decision. Adding a prompt is editing a file. Reviewing a change is reading a diff. There is no admin interface to maintain and no migration to run, and the entire dataset is greppable." },
      { type: "p", text: "The cost is real but small: no validation at write time. We addressed that with a zero-dependency validation script in CI rather than by adopting a schema library, which kept the constraint intact." },

      { type: "h3", text: "What held up: no framework" },
      { type: "p", text: "The whole app is readable in an afternoon. Every page is an HTML file, the shared header and footer are two small scripts that inject markup, and there is nothing to install to work on it. Two years of framework churn have happened elsewhere and none of it has required action here." },

      { type: "h3", text: "What did not hold up: the five-type taxonomy" },
      { type: "p", text: "We defined five item types — prompt, article, tool, agent, doc — and wrote in the project documentation that the list was locked. It was locked for good reasons: every type multiplies the surface area of bookmarks, ratings, comments, and profile handling." },
      { type: "p", text: "It was still wrong to call it locked rather than costly. A locked list invites the worse failure, which is cramming a genuinely new kind of thing into an existing type because the rules say you may not add one. Dated blog posts are not evergreen methodology articles; making them share a type would have produced a listing page that could not decide what it was ordering by." },
      { type: "callout", text: "Constraints should be expensive to violate, not impossible. The version that is impossible to violate gets violated dishonestly, by mislabelling." },

      { type: "h3", text: "The feature we were repeatedly wrong to want" },
      { type: "p", text: "Accounts. Every few months the same reasoning recurs: users would like to save prompts, saving needs identity, identity needs auth, auth needs a backend. Each step follows from the last and the conclusion is a database and a moderation policy for a site that is a list of text files." },
      { type: "p", text: "Bookmarks in local storage covered the actual need — the same person, on the same machine, wanting their saved items back. Everything beyond that was a hypothesis about users we did not have. The parking-lot document exists specifically to absorb this idea each time it returns, and it has done so more than once." },

      { type: "h3", text: "What we would do differently" },
      { type: "list", items: [
        "Write the validation script first. The schema drifted for months before CI started enforcing it.",
        "Put a date on content from the start. Adding one retroactively means guessing.",
        "Treat the shared header as a component from day one rather than copying markup between pages and reconciling the drift later.",
        "Be more suspicious of any sentence in an internal document that contains the word 'never'."
      ]},
      { type: "p", text: "None of this is a general prescription. A different project with a team, a content pipeline, and real traffic would reasonably make the opposite call on most of these. The point is that the constraints were written down where they could be argued with, which is the part worth copying." }
    ]
  }

];
