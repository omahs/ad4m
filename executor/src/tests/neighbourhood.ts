import { Link, Perspective, LinkExpression, ExpressionProof, LinkQuery, LanguageMetaInput } from "@perspect3vism/ad4m";
import { TestContext } from './integration.test'
import sleep from "./sleep";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { expect } from "chai";

const DIFF_SYNC_OFFICIAL = fs.readFileSync("./scripts/perspective-diff-sync-hash").toString();

export default function neighbourhoodTests(testContext: TestContext) {
    return () => {
        describe('Neighbourhood', () => {
            it('can publish and join locally @alice', async () => {
                const ad4mClient = testContext.alice!;

                const create = await ad4mClient!.perspective.add("publish-test");
                expect(create.name).to.be.equal("publish-test");
                expect(create.neighbourhood).to.be.null;

                //Create unique perspective-diff-sync to simulate real scenario
                const socialContext = await ad4mClient.languages.applyTemplateAndPublish(DIFF_SYNC_OFFICIAL, JSON.stringify({uid: uuidv4(), name: "Alice's perspective-diff-sync"}));
                expect(socialContext.name).to.be.equal("Alice's perspective-diff-sync");

                let link = new LinkExpression()
                link.author = "did:test";
                link.timestamp = new Date().toISOString();
                link.data = new Link({source: "src", target: "target", predicate: "pred"});
                link.proof = new ExpressionProof("sig", "key");
                const publishPerspective = await ad4mClient.neighbourhood.publishFromPerspective(create.uuid, socialContext.address, 
                    new Perspective(
                        [link]
                    )
                );

                //Check that we got an ad4m url back
                expect(publishPerspective.split("://").length).to.be.equal(2);

                const perspective = await ad4mClient.perspective.byUUID(create.uuid);
                expect(perspective?.neighbourhood).not.to.be.undefined;
                expect(perspective?.neighbourhood!.linkLanguage).to.be.equal(socialContext.address);
                expect(perspective?.neighbourhood!.meta.links.length).to.be.equal(1);
            })

            it('can be created by Alice and joined by Bob', async () => {
                const alice = testContext.alice
                const bob = testContext.bob

                const aliceP1 = await alice.perspective.add("friends")
                const socialContext = await alice.languages.applyTemplateAndPublish(DIFF_SYNC_OFFICIAL, JSON.stringify({uid: uuidv4(), name: "Alice's neighbourhood with Bob"}));
                expect(socialContext.name).to.be.equal("Alice's neighbourhood with Bob");
                const neighbourhoodUrl = await alice.neighbourhood.publishFromPerspective(aliceP1.uuid, socialContext.address, new Perspective())

                let bobP1 = await bob.neighbourhood.joinFromUrl(neighbourhoodUrl);

                await testContext.makeAllNodesKnown()
                
                expect(bobP1!.name).not.to.be.undefined;
                expect(bobP1!.sharedUrl).to.be.equal(neighbourhoodUrl)
                expect(bobP1!.neighbourhood).not.to.be.undefined;;
                expect(bobP1!.neighbourhood!.linkLanguage).to.be.equal(socialContext.address);
                expect(bobP1!.neighbourhood!.meta.links.length).to.be.equal(0);

                await sleep(5000)

                await alice.perspective.addLink(aliceP1.uuid, {source: 'root', target: 'test://test'})

                await sleep(5000)

                let bobLinks = await bob.perspective.queryLinks(bobP1!.uuid, new LinkQuery({source: 'root'}))
                let tries = 1

                while(bobLinks.length < 1 && tries < 20) {
                    await sleep(1000)
                    bobLinks = await bob.perspective.queryLinks(bobP1!.uuid, new LinkQuery({source: 'root'}))
                    tries++
                }
                
                expect(bobLinks.length).to.be.equal(1)
            })
        })
    }
}