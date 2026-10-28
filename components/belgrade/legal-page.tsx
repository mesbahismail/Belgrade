import * as React from "react"

import { Reveal } from "@/components/belgrade/motion"
import { Container } from "@/components/belgrade/ui"

const placeholder = [
  ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia felis lorem, eget consectetur dui lacinia ac. Fusce ultrices nec libero in dapibus. Fusce condimentum diam vel eros cursus, eu vulputate magna commodo. Sed convallis lectus eget risus tincidunt accumsan. Sed faucibus viverra odio, quis sodales justo condimentum eu."],
  [
    "Nunc congue sed lorem commodo sodales. Suspendisse a tristique tellus. Maecenas porta quam elit, vitae tristique nisl viverra quis. Integer sit amet sapien id urna rhoncus lobortis. Cras tincidunt dui vel posuere eleifend. Vivamus finibus velit non varius convallis.",
    "Aliquam dignissim ultricies velit. Sed eros lectus, imperdiet sit amet nisi vel, elementum consequat massa. Nam augue justo, condimentum nec blandit id, blandit at eros. Quisque vel augue eu quam faucibus mattis.",
  ],
  [
    "Fusce commodo massa in lacus facilisis laoreet. Ut at feugiat sem. Fusce a elit eu urna hendrerit mattis. In venenatis nulla diam, vitae rhoncus massa lacinia a. Sed ornare, ex id sodales luctus, turpis purus tincidunt urna, at dapibus dui ante eu lacus. Aliquam ut tempus ante. Donec consequat, velit quis cursus laoreet, metus massa feugiat sapien, sodales commodo erat mi sed libero.",
    "Suspendisse sit amet feugiat est, at commodo erat. Curabitur convallis pharetra ex, et condimentum justo pretium sit amet. Vestibulum felis eros, cursus at pretium in, auctor ac tellus. Nunc eget orci consequat, mollis justo vitae, condimentum ex. Praesent nec ex porta eros mattis tempor. Quisque bibendum lobortis euismod.",
  ],
  ["Suspendisse eleifend finibus tortor, a euismod turpis tincidunt sed. Phasellus pellentesque ex a orci blandit iaculis. In erat elit, vestibulum ac magna at, luctus ornare mi. Donec ut ipsum at nisi facilisis ultrices. Aliquam erat volutpat. Vestibulum leo ligula, mattis eget elit a, commodo eleifend nisi. Pellentesque euismod, lorem et facilisis volutpat, odio quam congue nisi, eu faucibus est nulla vel nunc. Aliquam dapibus malesuada metus vel finibus."],
  ["Donec enim turpis, iaculis quis nibh sed, eleifend venenatis leo. Aenean vitae odio dignissim, consectetur justo vitae, volutpat odio. Fusce vel orci sed justo pellentesque convallis. Quisque enim odio, fringilla non odio a, fermentum porta tortor."],
  ["Fusce malesuada, risus vel mollis dapibus, libero turpis congue quam, eu consequat erat velit at sem. Cras eget venenatis lectus. Suspendisse tempor, orci vitae mattis molestie, eros est interdum libero, quis maximus erat massa sit amet leo. Aliquam felis risus, fermentum et magna vel, placerat semper eros. Sed eu odio et diam tristique tincidunt. Quisque egestas ligula sed risus lacinia iaculis. Suspendisse justo velit, tempus ut dictum ac, consectetur a purus."],
]

/** Long-form legal page. Pass your own `children` to replace the placeholder copy. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated?: string
  children?: React.ReactNode
}) {
  return (
    <section className="pt-36 pb-12 sm:pt-40">
      <Container className="max-w-[824px]">
        <Reveal>
          <h1 className="text-[clamp(2.4rem,5vw,3.3rem)] leading-tight font-normal tracking-[-0.03em]">
            {title}
          </h1>
          {updated && (
            <p className="mt-3 text-sm font-light text-muted-foreground">
              Last updated {updated}
            </p>
          )}
        </Reveal>
        <div className="mt-8 space-y-7 text-[16px] leading-[1.7] font-light text-muted-foreground">
          {children ??
            placeholder.map((group, i) => (
              <Reveal key={i} delay={Math.min(i, 3) * 0.06} y={16}>
                {group.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  )
}
