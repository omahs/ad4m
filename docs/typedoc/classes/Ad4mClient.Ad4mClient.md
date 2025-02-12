[@perspect3vism/ad4m](../README.md) / [Exports](../modules.md) / [Ad4mClient](../modules/Ad4mClient.md) / Ad4mClient

# Class: Ad4mClient

[Ad4mClient](../modules/Ad4mClient.md).Ad4mClient

Client for the Ad4m interface wrapping GraphQL queryies
for convenient use in user facing code.

Aggregates the six sub-clients:
AgentClient, ExpressionClient, LanguageClient,
NeighbourhoodClient, PerspectiveClient and RuntimeClient
for the respective functionality.

## Table of contents

### Constructors

- [constructor](Ad4mClient.Ad4mClient.md#constructor)

### Properties

- [#agentClient](Ad4mClient.Ad4mClient.md##agentclient)
- [#apolloClient](Ad4mClient.Ad4mClient.md##apolloclient)
- [#expressionClient](Ad4mClient.Ad4mClient.md##expressionclient)
- [#languageClient](Ad4mClient.Ad4mClient.md##languageclient)
- [#neighbourhoodClient](Ad4mClient.Ad4mClient.md##neighbourhoodclient)
- [#perspectiveClient](Ad4mClient.Ad4mClient.md##perspectiveclient)
- [#runtimeClient](Ad4mClient.Ad4mClient.md##runtimeclient)

### Accessors

- [agent](Ad4mClient.Ad4mClient.md#agent)
- [expression](Ad4mClient.Ad4mClient.md#expression)
- [languages](Ad4mClient.Ad4mClient.md#languages)
- [neighbourhood](Ad4mClient.Ad4mClient.md#neighbourhood)
- [perspective](Ad4mClient.Ad4mClient.md#perspective)
- [runtime](Ad4mClient.Ad4mClient.md#runtime)

## Constructors

### constructor

• **new Ad4mClient**(`client`, `subscribe?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `client` | `ApolloClient`<`any`\> | `undefined` |
| `subscribe` | `boolean` | `true` |

#### Defined in

[Ad4mClient.ts:28](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L28)

## Properties

### #agentClient

• `Private` **#agentClient**: [`AgentClient`](agent_AgentClient.AgentClient.md)

#### Defined in

[Ad4mClient.ts:20](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L20)

___

### #apolloClient

• `Private` **#apolloClient**: `ApolloClient`<`any`\>

#### Defined in

[Ad4mClient.ts:19](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L19)

___

### #expressionClient

• `Private` **#expressionClient**: [`ExpressionClient`](expression_ExpressionClient.ExpressionClient.md)

#### Defined in

[Ad4mClient.ts:21](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L21)

___

### #languageClient

• `Private` **#languageClient**: [`LanguageClient`](language_LanguageClient.LanguageClient.md)

#### Defined in

[Ad4mClient.ts:22](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L22)

___

### #neighbourhoodClient

• `Private` **#neighbourhoodClient**: [`NeighbourhoodClient`](neighbourhood_NeighbourhoodClient.NeighbourhoodClient.md)

#### Defined in

[Ad4mClient.ts:23](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L23)

___

### #perspectiveClient

• `Private` **#perspectiveClient**: [`PerspectiveClient`](perspectives_PerspectiveClient.PerspectiveClient.md)

#### Defined in

[Ad4mClient.ts:24](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L24)

___

### #runtimeClient

• `Private` **#runtimeClient**: [`RuntimeClient`](runtime_RuntimeClient.RuntimeClient.md)

#### Defined in

[Ad4mClient.ts:25](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L25)

## Accessors

### agent

• `get` **agent**(): [`AgentClient`](agent_AgentClient.AgentClient.md)

#### Returns

[`AgentClient`](agent_AgentClient.AgentClient.md)

#### Defined in

[Ad4mClient.ts:38](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L38)

___

### expression

• `get` **expression**(): [`ExpressionClient`](expression_ExpressionClient.ExpressionClient.md)

#### Returns

[`ExpressionClient`](expression_ExpressionClient.ExpressionClient.md)

#### Defined in

[Ad4mClient.ts:42](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L42)

___

### languages

• `get` **languages**(): [`LanguageClient`](language_LanguageClient.LanguageClient.md)

#### Returns

[`LanguageClient`](language_LanguageClient.LanguageClient.md)

#### Defined in

[Ad4mClient.ts:46](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L46)

___

### neighbourhood

• `get` **neighbourhood**(): [`NeighbourhoodClient`](neighbourhood_NeighbourhoodClient.NeighbourhoodClient.md)

#### Returns

[`NeighbourhoodClient`](neighbourhood_NeighbourhoodClient.NeighbourhoodClient.md)

#### Defined in

[Ad4mClient.ts:50](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L50)

___

### perspective

• `get` **perspective**(): [`PerspectiveClient`](perspectives_PerspectiveClient.PerspectiveClient.md)

#### Returns

[`PerspectiveClient`](perspectives_PerspectiveClient.PerspectiveClient.md)

#### Defined in

[Ad4mClient.ts:54](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L54)

___

### runtime

• `get` **runtime**(): [`RuntimeClient`](runtime_RuntimeClient.RuntimeClient.md)

#### Returns

[`RuntimeClient`](runtime_RuntimeClient.RuntimeClient.md)

#### Defined in

[Ad4mClient.ts:58](https://github.com/perspect3vism/ad4m/blob/e76a46f1/core/src/Ad4mClient.ts#L58)
