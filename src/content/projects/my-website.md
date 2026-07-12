---
title: My Personal Website
id: my-website
tags: ["personal", "software"]
dates: "Jun '26"
sortDate: 2026-06-01
image: "screenshot.png"
githubUrl: "https://github.com/ryanhaus/my-website"
desc: "The very website that you're on now, I used the Astro static site generator framework to automatically convert Markdown files about my projects into this website."
---

I recently decided to start working on a personal portfolio website, which you are viewing now.

## Content
For this website, I used the [Astro](https://astro.build/) static generator framework to make it easy to organize my projects.
For each project, I write a Markdown file with some metadata at the top and then the content of the page, and Astro (well, my code that *uses* Astro) takes each automatically detected file, renders it to HTML, then also creates the project selection home page based on the projects.
For example, you can see the Markdown source for this page [here](https://github.com/ryanhaus/my-website/blob/main/src/content/projects/my-website.md).

```mermaid
---
config:
    theme: 'neutral'
---
flowchart LR
    subgraph my_code[My Code]
        subgraph projects[Project Descriptions]
            direction TD
            md[Markdown Files\nfor Projects]
            assets[Project Assets]
        end

        subgraph astro_files[Astro Files]
            direction TD
            astro_index[Astro Home\nPage Generator]
            astro_proj[Astro Project\nPage Generator]
        end
    end

    astro[Astro]
    html[Generated HTML]


    md --> astro
    assets --> astro

    astro_index --> astro
    astro_proj --> astro

    astro --> html
```

## Hosting & Domain
As for hosting, I was originally using a Raspberry Pi 3B+ within my Docker Swarm homelab network and Apache httpd, but later decided that it would be better to take advantage of Cloudflare's free static site hosting.
I've also hooked up a Cloudflare worker to automatically compile the website's HTML on every Git push.

As for the domain, I'm using Cloudflare Registrar to lease the domain, which they offer at-cost so the domain is pretty cheap (~$6 / year).
This comes with the benefit that I can use Cloudflare's proxying service for free, which I use for a few of my services.

### New setup
As mentioned, I changed the website to be automatically compiled & served by Cloudflare. See the diagram below for a visual representation:

```mermaid
---
config:
    theme: 'neutral'
---
flowchart LR
    me[Me]
    github[GitHub]

    subgraph cloudflare[Cloudflare Servers]
        subgraph worker[Cloudflare Worker]
            git[Git\nRepo]
            node["NodeJS\n(Astro)"]
        end

        sites[Cloudflare\nPages]
    end

    you[You]


    me --git push--> github
    github --Automatic\naction--> git
    git --Markdown\nfiles--> node
    git --Astro\ncode--> node
    node --Generated\nHTML--> sites
    sites --ryanha.us--> you
```

### Old setup
For comparison, this is what it looked like *before* I switched to using Cloudflare workers and static site hosting:
```mermaid
---
config:
    theme: 'neutral'
---
flowchart LR
    me[Me]

    github[GitHub\nServers]

    subgraph pi[Raspberry Pi 3B+]
        git[Git\nRepo]
        node["NodeJS\n(Astro)"]
        httpd[Apache\nhttpd]
    end

    cloudflare[Cloudflare\nServers]
    you[You]

    me --git push--> github
    github --git pull--> git
    git --Markdown\nfiles--> node
    git --Astro\ncode--> node
    node --Generated\nHTML--> httpd
    httpd --Cloudflare\nTunnel--> cloudflare --ryanha.us--> you
```

Now I don't have to worry about someone unplugging my server, losing power, or some other issue taking down my website anymore :smile:.
I also don't have to worry about manually pulling & redeploying my website every time I make a change.
I guess I could've used a GitHub action for that, but might as well just make the jump to this if I'm going that route.
